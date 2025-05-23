import React, { useState } from "react";
import axios from "axios";

const ChatBox = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setChat([...chat, { sender: "user", text: input }]);
    setInput("");

    const res = await axios.post("http://localhost:3001/api/chat", { message: input });
    setChat([...chat, { sender: "user", text: input }, { sender: "bot", text: res.data.reply }]);
  };

  return (
    <div>
      <div className="border p-3 h-64 overflow-y-scroll mb-2 bg-gray-100">
        {chat.map((msg, index) => (
          <div key={index} className={`my-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <span className={`inline-block px-3 py-1 rounded ${msg.sender === "user" ? "bg-blue-300" : "bg-green-300"}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type in Kannada..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
