import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaPaperPlane, FaMicrophone, FaPaperclip } from "react-icons/fa";

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
    <div className="w-full max-w-md mx-auto h-[100vh] flex flex-col bg-[#f0f0f0] shadow-md">
      
      {/* Header */}
      <div className="bg-[#075e54] text-white flex items-center p-3 space-x-3">
        <img src="https://via.placeholder.com/40" className="w-10 h-10 rounded-full" alt="Profile" />
        <div>
          <div className="font-semibold">KannadaBot</div>
          <div className="text-xs text-green-100">online</div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto bg-[#e5ddd5] p-3">
        {chat.map((msg, index) => (
          <div key={index} className={`mb-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-3 py-2 text-sm rounded-xl shadow relative
              ${msg.sender === "user" ? "bg-[#dcf8c6] rounded-br-none" : "bg-white rounded-bl-none"}`}>
              {msg.text}
              <div className="text-[10px] text-gray-500 text-right mt-1">{msg.time}</div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input Area */}
      <div className="flex items-center p-2 bg-white border-t border-gray-300">
        <button className="text-gray-600 px-2">
          <FaPaperclip size={18} />
        </button>
        <input
          className="flex-1 mx-2 px-3 py-2 text-sm border rounded-full border-gray-300 focus:outline-none"
          type="text"
          placeholder="Message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        {input.trim() ? (
          <button onClick={sendMessage} className="text-green-600 px-2">
            <FaPaperPlane size={18} />
          </button>
        ) : (
          <button className="text-gray-600 px-2">
            <FaMicrophone size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
