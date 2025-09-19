import { useEffect, useRef } from "react";
import Message from "./components/Message";

export default function ChatWindows({ messages }) {
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return (
    <div ref={chatRef} className="flex-1 overflow-y-auto p-4 bg-gray-50">
      {messages.map((msg, idx) => (
        <Message key={idx} text={msg.text} sender={msg.sender} />
      ))}
    </div>
  );
}
