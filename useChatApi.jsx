export default function useChatApi() {
  const sendMessage = async (message) => {
    try {
      // Replace with actual weather agent API endpoint
      const res = await fetch("'https://millions-screeching-vultur.mastra.cloud/api/agents/weatherAgent/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: message }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      return data.reply; // assuming { reply: "text" }
    } catch (err) {
      console.error(err);
      return "Sorry,something went wrong!.";
    }
  };

  return { sendMessage };
}
