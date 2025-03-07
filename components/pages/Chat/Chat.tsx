/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface Message {
  role: "user" | "bot";
  text: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi there 👋\nHow are you?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://chatbotmist-3.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input }),
      });

      const data = await response.json();
      const botMessage: Message = { role: "bot", text: data.response };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot API error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] py-10">
      <Card className="w-full overflow-hidden py-0 border-0 rounded">
        <header className="bg-[#3B82F6] text-white px-4 py-3 flex justify-between items-center">
          <h2 className="text-lg font-semibold flex items-center">
            🤖 Chatbot
          </h2>
          <button
            className="text-white p-1"
            onClick={() => setMessages([{ role: "bot", text: "Hi there! How can I help?" }])}
          >
            ⏎ Reset
          </button>
        </header>

        <div className="p-4 h-[250px] overflow-y-auto space-y-3 bg-white">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`p-3 rounded-lg ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                  } max-w-xs whitespace-pre-line`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 p-3 bg-gray-100 border-t">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow"

          />
          <Button

            onClick={sendMessage}
            // disabled={loading}
            className="bg-[#3B82F6] hover:bg-blue-600 text-lg text-white rounded px-14 py-8"
          >
            {loading ? <div>  <img className="size-10 animate-spin" src="https://www.svgrepo.com/show/474682/loading.svg" alt="Loading icon" />
            </div> : "Send"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
