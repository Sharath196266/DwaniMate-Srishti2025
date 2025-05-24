import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaPaperPlane, FaPaperclip } from "react-icons/fa";

const ChatBox = () => {
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim() && !image) return;

    const userMsg = {
      sender: "user",
      text: input || "📷 Image",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setChat((prev) => [...prev, userMsg]);

    const payload = { message: input };
    if (image) payload.image = image;

    setInput("");
    setImage(null);

    try {
      const res = await axios.post("http://localhost:3001/api/chat", payload);
      const botMsg = {
        sender: "bot",
        text: res.data.reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setChat((prev) => [...prev, botMsg]);

      if (res.data.audioUrl) {
        const audio = new Audio(res.data.audioUrl);
        audio.play();
      }
    } catch (err) {
      const errorMsg = {
        sender: "bot",
        text: "⚠️ Error connecting to backend.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setChat((prev) => [...prev, errorMsg]);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img src="/vite.svg" alt="Logo" />
        <div>
          <div className="chat-header-title">ದ್ವನಿಮಿತ್ರ</div>
          <div className="chat-header-sub">Online</div>
        </div>
      </div>

      <div className="chat-body">
        {chat.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
            <div className="message-time">{msg.time}</div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      <div className="chat-footer">
        {/* Hidden file input for image upload */}
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />

        {/* Show text input only if no image */}
        {!image ? (
          <input
            type="text"
            placeholder="Message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
        ) : (
          <div className="image-preview">📷 Image selected</div>
        )}

        {/* Attachment icon - disabled if image is selected */}
        {!image && (
          <label htmlFor="imageUpload" style={{ cursor: "pointer", color: "#1a73e8", fontSize: 20 }}>
            <FaPaperclip />
          </label>
        )}

        {/* Deselect image button */}
        {image && (
          <button onClick={() => setImage(null)} style={{ color: "red", fontSize: 20, background: "none", border: "none", cursor: "pointer" }}>
            ✖
          </button>
        )}

        <button onClick={sendMessage} style={{ color: "#1a73e8", fontSize: 20, background: "none", border: "none", cursor: "pointer" }}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
