import React, { useState } from "react";
import ChatBox from "./components/ChatBox";

const App = () => {
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold text-center mb-4">Kannada AI Chatbot</h1>
      <ChatBox />
    </div>
  );
};

export default App;
