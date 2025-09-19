export default function useChatAPI() {
  const sendMessage = async (message, threadId = "107") => {
    try {
      const res = await fetch(
        "https://millions-screeching-vultur.mastra.cloud/api/agents/weatherAgent/stream",
        {
          method: "POST",
          headers: {
            "x-mastra-dev-playground": "true",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [{ role: "user", content: message }],
            runId: "weatherAgent",
            maxRetries: 2,
            maxSteps: 5,
            temperature: 0.5,
            topP: 1,
            runtimeContext: {},
            threadId, // replace with your roll number
            resourceId: "weatherAgent",
          }),
        }
      );

      if (!res.ok) throw new Error("API error");

      // Since it's a stream, collect text chunks
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
      }

      // Try parsing JSON response if needed
      try {
        const parsed = JSON.parse(result);
        return parsed.reply || JSON.stringify(parsed);
      } catch {
        return result;
      }
    } catch (err) {
      console.error(err);
      return " Unable to fetch weather data right now.";
    }
  };

  return { sendMessage };
}
