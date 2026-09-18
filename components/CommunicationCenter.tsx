"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Paperclip } from "lucide-react";
import Image from "next/image";

interface Message {
  id: string;
  sender: "anchor" | "user" | "system";
  text: string;
  timestamp: string;
}

export default function CommunicationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const emailSendingRef = useRef(false);
  
  const generateMessageId = () => Date.now().toString() + Math.random().toString(36).substring(2, 11);
  
  const [stage, setStage] = useState("collecting_name");
  const [userData, setUserData] = useState({ name: "", age: "", location: "", email: "", grievance: "" });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [gravityLoad, setGravityLoad] = useState("STABLE");

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            id: generateMessageId(),
            sender: "anchor",
            text: "You're here.\nWhat should I call you?",
            timestamp: getTimestamp(),
          },
        ]);
        setStage("collecting_name");
      }, 300);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isTransmitting]);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("open-anchor-chat", handleOpenChat);
    return () => window.removeEventListener("open-anchor-chat", handleOpenChat);
  }, []);

  // Keep composer in view on mobile keyboard open by auto-scrolling
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const handleResize = () => {
         if (messagesEndRef.current) {
           messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
         }
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isOpen]);

  const getTimestamp = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusText = () => {
    if (isTransmitting) return "TRANSMITTING";
    if (isTyping) return "THINKING";
    if (stage === "success") return "RECEIVED";
    return "ONLINE";
  };

  const getContextualActions = () => {
    if (stage === "collecting_name" || stage === "collecting_age" || stage === "collecting_location" || stage === "collecting_email") {
      return [
        { id: "01", label: "WHO I AM", action: "WHO ARE YOU?" },
        { id: "02", label: "WHAT I CAN DO", action: "WHAT CAN YOU DO?" },
      ];
    }
    if (stage === "grievance") {
      return [
        { id: "01", label: "REPORT SOMETHING", action: "I need to report something." },
        { id: "02", label: "I NEED HELP", action: "I need help." },
      ];
    }
    if (stage === "success") {
      return [
        { id: "01", label: "NEW CONVERSATION", action: "RESET_FLOW" },
        { id: "02", label: "CLOSE CHANNEL", action: "CLOSE_CHANNEL" }
      ];
    }
    return [
      { id: "01", label: "TALK TO ANCHOR", action: "Hello Anchor" }
    ];
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to close this channel and start a new conversation?")) {
      setMessages([
        {
          id: generateMessageId(),
          sender: "anchor",
          text: "What should I call you?",
          timestamp: getTimestamp(),
        }
      ]);
      setStage("collecting_name");
      setUserData({ name: "", age: "", location: "", email: "", grievance: "" });
      setGravityLoad("STABLE");
      setIsOpen(false);
      setTimeout(() => setIsOpen(true), 100);
    }
  };

  const handleSend = (text: string = inputValue) => {
    if (isTyping || isTransmitting || emailSendingRef.current) return;

    if (text === "RESET_FLOW") {
      handleReset();
      return;
    }
    
    if (text === "CLOSE_CHANNEL") {
      setIsOpen(false);
      return;
    }

    if (!text.trim()) return;
    
    const userMsg: Message = {
      id: generateMessageId(),
      sender: "user",
      text: text.trim(),
      timestamp: getTimestamp(),
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);
    setGravityLoad("ACTIVE");

    processUserInput([...messages, userMsg]);
  };

  const handleRetry = () => {
    if (isTyping || isTransmitting || emailSendingRef.current) return;

    // Filter out previous error messages from the UI
    const cleanedMessages = messages.filter(m => m.sender !== 'system' || (!m.id.includes('_err') && !m.text.includes("I couldn't generate")));
    setMessages(cleanedMessages);
    
    setIsTyping(true);
    setGravityLoad("ACTIVE");

    processUserInput(cleanedMessages);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const processUserInput = async (currentMessages: Message[]) => {
    const userMessageText = currentMessages[currentMessages.length - 1]?.text || "";

    // ----------------------------------------------------
    // DETERMINISTIC ONBOARDING (Client-Side Only)
    // ----------------------------------------------------
    if (stage !== 'grievance' && stage !== 'success') {
      let nextStage = stage;
      let nextReply = "";
      const updatedData = { ...userData };
      let hasSystemError = false;

      if (stage === 'collecting_name') {
        updatedData.name = userMessageText;
        nextStage = 'collecting_age';
        nextReply = "How old are you?";
      } 
      else if (stage === 'collecting_age') {
        const ageNum = parseInt(userMessageText, 10);
        if (isNaN(ageNum) || ageNum < 5 || ageNum > 120) {
          nextReply = "Please enter a valid age as a number.";
        } else {
          updatedData.age = userMessageText;
          nextStage = 'collecting_location';
          nextReply = "Where are you based?";
        }
      } 
      else if (stage === 'collecting_location') {
        updatedData.location = userMessageText;
        nextStage = 'collecting_email';
        nextReply = "And where can I reach you?";
      } 
      else if (stage === 'collecting_email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userMessageText)) {
          nextReply = "That doesn't look like a valid email address. Try it again.";
        } else {
          updatedData.email = userMessageText;
          setUserData(updatedData);

          emailSendingRef.current = true;
          setIsTransmitting(true);
          try {
            const res = await fetch('/api/anchor/email', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updatedData)
            });
            
            const data = await res.json().catch(() => ({ success: false }));
            
            if (!res.ok || data.success !== true) {
               throw new Error(data.error || "Channel integration failed");
            }
            
            emailSendingRef.current = false;
            setIsTransmitting(false);
            nextStage = 'grievance';
            nextReply = "So... tell me. How can I help you?";
          } catch (error) {
            emailSendingRef.current = false;
            setIsTransmitting(false);
            setGravityLoad("STABLE");
            setIsTyping(false);
            setMessages((prev) => [
              ...prev,
              {
                id: generateMessageId() + "_err",
                sender: "system",
                text: "Channel integration failed. Please try again.",
                timestamp: getTimestamp(),
              },
            ]);
            return;
          }
        }
      }

      if (stage !== 'collecting_email' || !updatedData.email || nextStage !== 'grievance') {
        setUserData(updatedData);
      }

      if (hasSystemError) {
        setGravityLoad("STABLE");
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: generateMessageId() + "_err",
            sender: "system",
            text: "Communication channel activation failed.",
            timestamp: getTimestamp(),
          },
        ]);
        return;
      }

      // Simulate a natural thinking delay for deterministic responses (if not awaiting an API)
      const delay = (stage === 'collecting_email' && nextStage === 'grievance') ? 0 : 600;

      setTimeout(() => {
        setStage(nextStage);
        setGravityLoad("STABLE");
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: generateMessageId(),
            sender: "anchor",
            text: nextReply,
            timestamp: getTimestamp(),
          },
        ]);
      }, delay);
      
      return;
    }

    // ----------------------------------------------------
    // GROQ API PHASE (Grievance/Problem Solving)
    // ----------------------------------------------------
    const currentHistory = currentMessages
      .filter(m => m.sender !== 'system')
      .map((m) => ({
        role: m.sender === 'anchor' ? 'assistant' : 'user',
        content: m.text
      }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationHistory: currentHistory,
          visitorData: userData,
          stage: stage
        })
      });

      const data = await res.json();

      if (!res.ok) {
        const errorText = data.error || "I couldn't generate your response right now.\nPlease try again.";
        const err = new Error(errorText);
        // Tag rate-limit errors so the catch block can show the in-character message
        (err as any).isRateLimit = res.status === 429;
        throw err;
      }

      setUserData(data.updatedVisitorData);
      setStage(data.updatedStage);
      setGravityLoad(data.updatedStage === 'success' ? "STABLE" : "ELEVATED");
      
      setMessages((prev) => [
        ...prev,
        {
          id: generateMessageId(),
          sender: "anchor",
          text: data.reply,
          timestamp: getTimestamp(),
        },
      ]);

    } catch (e: any) {
      console.error('[GROQ DEBUG] Client-side catch:', e?.message);
      setGravityLoad("STABLE");
      
      // Use in-character message for rate limits, sanitized fallback for everything else
      const safeMessage = e?.isRateLimit
        ? (e.message || "Give me a moment. Even I need to catch my breath sometimes.")
        : "I couldn't generate your response right now.\nPlease try again.";
      
      setMessages((prev) => {
        // Prevent duplicate consecutive error messages
        if (prev.length > 0 && prev[prev.length - 1].sender === 'system' && prev[prev.length - 1].id.includes('_err')) {
           return prev;
        }
        return [
          ...prev,
          {
            id: generateMessageId() + "_err",
            sender: "system",
            text: safeMessage,
            timestamp: getTimestamp(),
          },
        ];
      });
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-[#FAF9F6] border border-[#D4A017] flex items-center justify-center shadow-[0_4px_20px_rgba(212,160,23,0.25)] hover:shadow-[0_4px_25px_rgba(212,160,23,0.4)] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105 group"
          aria-label="Open Anchor Chat"
        >
          <span className="brand-name text-[#1a1a1a] font-bold text-xl group-hover:scale-110 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">A</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-50 w-[calc(100vw-48px)] sm:w-[420px] transition-all duration-[400ms] ease-[cubic-bezier(0.32,0.72,0,1)] origin-bottom-right">
      
      {/* Light Theme Panel Container */}
      <div className="relative rounded-[20px] bg-[#F7F5EF] text-[#1a1a1a] shadow-[0_8px_40px_rgba(0,0,0,0.08)] anchor-light-panel-glow">
        
        {/* Animated Gravity Border injected via custom CSS class below */}
        
        <div className="relative z-10 w-full flex flex-col overflow-hidden rounded-[20px] bg-[#F7F5EF] max-h-[85vh] sm:max-h-[640px] min-h-[460px]">
          
          {/* Header */}
          <div className="relative z-20 flex flex-col shrink-0">
            <div className="flex items-center justify-between px-6 h-[76px] bg-[#FAF8F2]">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-full border border-[#D4A017] shadow-sm overflow-hidden flex-shrink-0 bg-[#F7F5EF]">
                  <img src="/images/character/media_1789375360773.jpg" alt="Anchor Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center min-w-0 gap-[1px]">
                  <div className="flex items-center gap-2.5">
                    <span className="brand-name text-[#1a1a1a] font-semibold tracking-[0.08em] text-[18px] truncate">ANCHOR</span>
                    <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full bg-[#16A34A] ${isTyping || isTransmitting ? 'animate-pulse' : ''}`}></span>
                      <span className="status-label text-[#16A34A] text-[9px] font-bold uppercase tracking-wider">{getStatusText()}</span>
                    </div>
                  </div>
                  <span className="status-label text-[#888] text-[10px] uppercase tracking-[0.1em] truncate">COMMUNICATION CHANNEL 001</span>
                  <span className="status-label text-[#D4A017] text-[9px] font-bold uppercase tracking-widest mt-0.5">
                    GRAVITY LOAD: {gravityLoad}
                  </span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center text-[#888] hover:text-[#D4A017] transition-colors flex-shrink-0 ml-2" aria-label="Close Chat">
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            {/* Gold Luminous Separator */}
            <div className="w-full h-[1px] bg-[#C9A227] shadow-[0_0_4px_rgba(201,162,39,0.35),0_0_10px_rgba(201,162,39,0.12)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1/4 h-full bg-[#FFE270] shadow-[0_0_8px_rgba(255,226,112,0.8)] animate-[travel-right_5s_linear_infinite]"></div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="relative z-10 flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4 custom-scrollbar bg-[#F7F5EF]">
            {messages.map((msg, index) => {
              const isAnchor = msg.sender === "anchor";
              const isSystem = msg.sender === "system";
              
              if (isSystem) {
                if (msg.id.includes("_err")) {
                  return (
                    <div key={msg.id} className="flex max-w-[76%] opacity-0 animate-[fadeUp_0.3s_ease-out_forwards] self-start gap-2.5">
                      <div className="relative w-9 h-9 rounded-full border border-[#D4A017] flex-shrink-0 overflow-hidden mt-0.5">
                         <Image src="/images/character/media_1789375360773.jpg" alt="Anchor" fill className="object-cover" />
                      </div>
                      <div className="flex flex-col items-start w-full">
                        <div className="flex items-center gap-2 mb-1.5 justify-start">
                          <span className="status-label text-[9.5px] font-bold tracking-widest uppercase text-[#1a1a1a]">
                            ANCHOR
                          </span>
                        </div>
                        <div className="w-fit text-[14px] leading-[1.45] font-sans whitespace-pre-wrap shadow-[0_4px_12px_rgba(0,0,0,0.08)] break-words text-left bg-[#F2F0EA] text-[#171717] px-4 py-3 border border-[#D4A017]/40 rounded-[4px_14px_14px_14px]">
                          {msg.text}
                          <div className="mt-3">
                            <button onClick={handleRetry} className="px-4 py-1.5 text-[9px] uppercase tracking-widest border border-[#D4A017] text-[#D4A017] rounded-full hover:bg-[#D4A017] hover:text-white transition-colors">
                              RETRY TRANSMISSION
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={msg.id} className="self-center flex flex-col items-center my-3 opacity-0 animate-[fadeUp_0.3s_ease-out_forwards]">
                       <span className="status-label text-[10px] text-[#B8860B] tracking-widest text-center whitespace-pre-line leading-relaxed font-bold uppercase">
                         {msg.text}
                       </span>
                    </div>
                  );
                }
              }

              return (
                <div key={msg.id} className={`flex opacity-0 animate-[fadeUp_0.3s_ease-out_forwards] ${isAnchor ? "max-w-[76%] self-start gap-2.5" : "max-w-[78%] self-end flex-col items-end"}`}>
                  
                  {isAnchor && (
                    <div className="relative w-9 h-9 rounded-full border border-[#D4A017] flex-shrink-0 overflow-hidden mt-0.5">
                       <Image src="/images/character/media_1789375360773.jpg" alt="Anchor" fill className="object-cover" />
                    </div>
                  )}

                  <div className={`flex flex-col ${isAnchor ? "items-start w-full" : "items-end"}`}>
                    <div className={`flex items-center gap-2 mb-1 ${isAnchor ? "justify-start" : "justify-end"}`}>
                      <span className={`status-label text-[9.5px] font-bold tracking-widest uppercase ${isAnchor ? "text-[#1a1a1a]" : "text-[#C9A227]"}`}>
                        {isAnchor ? "ANCHOR" : "YOU"}
                      </span>
                      <span className="status-label text-[8.5px] text-[#8C8983] tracking-wider">{msg.timestamp}</span>
                    </div>
                    <div 
                      className={`w-fit text-[15px] leading-[1.45] font-sans shadow-[0_2px_8px_rgba(0,0,0,0.06)] break-words [overflow-wrap:anywhere] text-left whitespace-pre-wrap ${
                        isAnchor 
                          ? "bg-[#F2F0EA] text-[#171717] px-4 py-2.5 border border-black/[0.06] rounded-[4px_14px_14px_14px] max-w-full" 
                          : "bg-[#C9A227] text-[#171717] px-[14px] py-[10px] min-h-[40px] min-w-[44px] flex items-center border border-[rgba(201,162,39,0.65)] rounded-[14px_4px_14px_14px] font-medium"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {isTyping && (
              <div className="flex self-start gap-2.5 max-w-[76%] opacity-0 animate-[fadeUp_0.3s_ease-out_forwards]">
                <div className="relative w-9 h-9 rounded-full border border-[#D4A017] flex-shrink-0 overflow-hidden mt-0.5">
                   <Image src="/images/character/media_1789375360773.jpg" alt="Anchor" fill className="object-cover" />
                </div>
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-1.5">
                      <span className="status-label text-[9.5px] font-bold tracking-widest uppercase text-[#1a1a1a]">ANCHOR</span>
                  </div>
                  <div className="w-fit bg-[#F2F0EA] px-4 py-3.5 border border-black/[0.06] rounded-[4px_14px_14px_14px] flex items-center gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.08)] h-[45px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] animate-[pulse_1s_ease-in-out_infinite]" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] animate-[pulse_1s_ease-in-out_infinite]" style={{ animationDelay: "200ms" }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] animate-[pulse_1s_ease-in-out_infinite]" style={{ animationDelay: "400ms" }}></span>
                  </div>
                </div>
              </div>
            )}
            
            {isTransmitting && (
               <div className="flex flex-col self-center my-5 opacity-0 animate-[fadeUp_0.3s_ease-out_forwards]">
                 <span className="status-label text-[9px] font-bold text-[#B8860B] tracking-widest uppercase">TRANSMITTING...</span>
               </div>
            )}
            
            <div ref={messagesEndRef} className="h-1" />
          </div>

          {/* Contextual Quick Actions */}
          <div className="px-6 pt-2 pb-3 flex flex-col gap-2 shrink-0 bg-[#F7F5EF] relative z-20">
             {getContextualActions().map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleSend(action.action)}
                  disabled={isTyping || isTransmitting}
                  className="group flex items-center justify-between py-3 px-2 bg-transparent border-b border-black/[0.12] hover:bg-[#D4A017]/[0.03] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.99] w-full rounded-sm"
                >
                  <div className="flex items-center gap-4">
                     <span className="status-label text-[#B8860B] font-medium text-[11px] w-4 text-left">{action.id}</span>
                     <span className="status-label text-[#171717] font-semibold text-[11px] uppercase tracking-wider">{action.label}</span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#D4A017] group-hover:translate-x-1 transition-transform duration-300"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
             ))}
          </div>

          {/* Input Area */}
          <div className="px-6 pb-6 shrink-0 bg-[#F7F5EF] relative z-20">
            <div className="flex items-center bg-[#FAF8F2] border border-black/[0.16] rounded-[12px] h-[56px] sm:h-[60px] pl-3 pr-2 focus-within:border-[#C9A227]/65 focus-within:shadow-[0_0_0_1px_rgba(201,162,39,0.10),0_0_12px_rgba(201,162,39,0.08)] transition-all">
              
              {/* Attachment Icon */}
              <button className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-[#8C8983] hover:text-[#D4A017] transition-colors rounded-full" aria-label="Add attachment">
                <Paperclip size={20} strokeWidth={1.5} />
              </button>
              
              {/* Divider */}
              <div className="w-[1px] h-6 bg-black/[0.12] mx-2 flex-shrink-0"></div>

              {/* Input */}
              <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="What are you carrying?"
                className="flex-1 min-w-0 bg-transparent border-none outline-none text-[#171717] font-sans text-[15px] sm:text-[16px] px-2 placeholder:text-[#77736B] h-full caret-[#D4A017]"
                disabled={isTyping || isTransmitting}
              />

              {/* Send Button */}
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isTyping || isTransmitting}
                className="flex-shrink-0 ml-2 w-11 h-11 rounded-full bg-[#C9A227] flex items-center justify-center text-[#1a1a1a] hover:bg-[#B8860B] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] disabled:opacity-40 disabled:bg-[#D4A017] disabled:pointer-events-none shadow-[0_0_10px_rgba(201,162,39,0.2)] active:scale-95"
                aria-label="Send message"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </button>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        
        .anchor-light-panel-glow {
          border: 1px solid rgba(200, 196, 188, 0.4);
          isolation: isolate;
        }

        .anchor-light-panel-glow::before {
          content: "";
          position: absolute;
          inset: -1.5px;
          border-radius: 21.5px;
          padding: 1.5px;
          background: conic-gradient(
            from var(--angle),
            transparent 0%,
            transparent 72%,
            rgba(184, 134, 11, 0.4) 82%,
            #D4A017 88%,
            #F0C94A 90%,
            #D4A017 92%,
            rgba(184, 134, 11, 0.4) 96%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: rotate-border 6s linear infinite;
          z-index: 1;
        }

        .anchor-light-panel-glow::after {
          content: "";
          position: absolute;
          inset: -6px;
          border-radius: 24px;
          background: conic-gradient(
            from var(--angle),
            transparent 0%,
            transparent 80%,
            rgba(212, 160, 23, 0.15) 88%,
            rgba(212, 160, 23, 0.3) 91%,
            transparent 100%
          );
          filter: blur(8px);
          animation: rotate-border 6s linear infinite;
          z-index: -1;
          pointer-events: none;
        }

        @keyframes rotate-border {
          to { --angle: 360deg; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 160, 23, 0.25);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 160, 23, 0.5);
        }
      `}} />
    </div>
  );
}
