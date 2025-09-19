import { useState } from "react";
import ChatWindow from "./components/ChatWindows";
import InputBox from "./components/Inputbox";
import useChatAPI from "./hooks/useChatApi";

export default function App() {
  const [messages, setMessages] = useState([]);
  const { streamMessage } = useChatAPI();
  const [loading, setLoading] = useState(false);

  const handleSend = async (text) => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Add user message
    setMessages((prev) => [...prev, { text, sender: "user", time }]);

    // Add empty bot placeholder
    const botIndex = messages.length + 1;
    setMessages((prev) => [...prev, { text: "", sender: "bot", time }]);

    setLoading(true);

    // Stream bot response
    await streamMessage(
      text,
      (partial) => {
        setMessages((prev) => {
          const updated = [...prev];
          updated[botIndex] = { text: partial, sender: "bot", time };
          return updated;
        });
      },
      "107"
    );

    setLoading(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 min-w-[320px]">
      <header className="bg-blue-600 text-white p-4 font-bold text-lg shadow-md text-center">
        Weather Chat 
      </header>
      <ChatWindow messages={messages} />
      {loading && (
        <p className="text-gray-500 italic text-center mb-2">Bot is typing...</p>
      )}
      <InputBox onSend={handleSend} loading={loading} />
    </div>
  );
}
