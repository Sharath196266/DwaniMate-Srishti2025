import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const ChatBox = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChat(prev => [...prev, userMsg]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:3001/api/chat", { message: input });
      const botMsg = { sender: "bot", text: res.data.reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setChat(prev => [...prev, botMsg]);

      const audio = new Audio(res.data.audioUrl);
      audio.play();
    } catch (err) {
      const errorMsg = { sender: "bot", text: "⚠️ Error connecting to backend.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setChat(prev => [...prev, errorMsg]);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="max-w-md mx-auto mt-10 border rounded shadow-lg flex flex-col h-[36rem] bg-white">
      {/* Header */}
      <div className="bg-green-600 text-white py-3 px-4 font-semibold text-lg rounded-t flex items-center">
        <span className="rounded-full bg-white text-green-600 w-8 h-8 flex items-center justify-center mr-2">🤖</span>
        Kannada ChatBot
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-[#e5ddd5]">
        {chat.map((msg, index) => (
          <div key={index} className={`flex mb-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`relative max-w-[75%] px-3 py-2 text-sm rounded-xl shadow
              ${msg.sender === "user" ? "bg-[#dcf8c6] rounded-br-none" : "bg-white rounded-bl-none"}`}>
              <div>{msg.text}</div>
              <div className="text-[10px] text-gray-600 text-right mt-1">{msg.time}</div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input */}
      <div className="flex p-2 bg-white border-t border-gray-200">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md text-sm focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-md text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
