import { useState } from "react";
export default function Inputbox({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex p-2 border-t bg-white">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="How can we help you..."
        className="flex-1 border rounded-full px-4 py-2 mr-2 outline-none"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full">
        Send
      </button>
    </form>
  );
}
