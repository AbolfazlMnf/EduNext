/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Send, Bot, Loader2, Sparkles } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import Lottie from "lottie-react";
import AiChat from "../assets/Lottie/AIChat.json";
import { renderMessageWithLinks } from "@/Utils/helper/renderMessage";

type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
  time: string;
};
interface IPayload {
  role: "assistant" | "user";
  content: string;
}
type TRole = "user" | "assistant";

export default function AIChatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi . how can i help you ?",
      sender: "ai",
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (data: IPayload[]) => {
      try {
        const res = await fetch("/api/chats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: data }),
        });
        const result = await res.json();
        return result;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (data) => {
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: data?.data?.choices?.[0]?.message?.content || "no response",
        sender: "ai",
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiMessage]);
    },
    onError: (err: any) => {
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: "Server error",
        sender: "ai",
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiMessage]);
    },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    sendMessage([
      ...messages.map((m) => ({
        role: m.sender === "ai" ? "assistant" : ("user" as TRole),
        content: m.text,
      })),
      {
        role: "user",
        content: inputValue,
      },
    ]);
    setInputValue("");
  };

  return (
    <div className={`fixed bottom-6 left-6 z-50`}>
      <div
        className={`absolute bottom-20 left-0
              transition-all duration-300 ease-out transform origin-bottom ${
                isOpen
                  ? "scale-100 opacity-100 translate-y-0"
                  : "scale-95 opacity-0 translate-y-10 pointer-events-none"
              }`}
      >
        <div
          className="w-[350px] sm:w-[400px] h-[550px] max-h-[85vh] bg-card text-card-foreground
        rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-border"
        >
          <div className="bg-primary p-4 px-5 flex items-center justify-between shadow-md z-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

            <div className="flex items-center gap-3 relative z-10">
              <div className="relative">
                <div className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md shadow-inner border border-white/20">
                  <Bot className="text-white" size={24} />
                </div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-primary rounded-full"></div>
              </div>
              <div className="flex flex-col">
                <h3 className="text-white font-bold text-base flex items-center gap-1">
                  Ai Assistant
                </h3>
                <p className="text-primary-foreground/80 text-xs font-medium">
                  online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-colors relative z-10"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 p-5 overflow-y-auto bg-background space-y-5 custom-scrollbar relative">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex w-full animate-slideUp ${
                  msg.sender === "user" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`flex flex-col gap-1.5 max-w-[85%] ${
                    msg.sender === "user" ? "items-start" : "items-end"
                  }`}
                >
                  <div
                    className={`px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-sm"
                        : "bg-secondary text-secondary-foreground rounded-2xl rounded-tl-sm border border-border"
                    }`}
                  >
                    {renderMessageWithLinks(msg.text)}
                  </div>
                  <span
                    suppressHydrationWarning
                    className="text-[11px] text-muted-foreground px-1 font-medium"
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isPending && (
              <div className="flex justify-end w-full animate-fadeIn">
                <div className="bg-secondary border border-border px-4 py-3.5 rounded-2xl rounded-tl-sm flex gap-1.5 items-center shadow-sm">
                  <div
                    className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-card border-t border-border">
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-2 bg-input/50 p-1.5 rounded-full border border-transparent focus-within:border-primary/50 focus-within:bg-background transition-all shadow-inner"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="type your question ..."
                className="flex-1 bg-transparent border-none focus:outline-none px-4 text-sm text-foreground placeholder:text-muted-foreground h-10"
                disabled={isPending}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isPending}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  inputValue.trim() && !isPending
                    ? "bg-primary text-primary-foreground shadow-md hover:scale-105 hover:shadow-primary/30"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                {isPending ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} className="rtl:rotate-180" />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-primary text-primary-foreground p-2 rounded-full h-16 w-16 shadow-[0_0_20px_rgba(124,58,237,0.4)]
           transition-all duration-300 hover:scale-105 flex items-center justify-center border border-primary-foreground/10 ${
             isOpen
               ? "rotate-90 opacity-0 pointer-events-none absolute"
               : "rotate-0 opacity-100 relative animate-float"
           }`}
      >
        <Lottie
          animationData={AiChat}
          style={{ width: "100%", height: "100%" }}
        />
      </button>
    </div>
  );
}
