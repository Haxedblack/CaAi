import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useFirebase } from "../contexts/FirebaseContext";
import MarkdownRenderer from "./MarkdownRenderer";
import Spinner from "./Spinner"; // Fallback to text if not found

const MessageBubble = React.memo(({ message }) => (
  <div
    className={`mb-2 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
    aria-live={message.sender === "assistant" ? "polite" : undefined}
  >
    <div
      className={`max-w-[70%] px-4 py-2 rounded-2xl shadow ${
        message.sender === "user"
          ? "bg-blue-600 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
      tabIndex={0}
      aria-label={`${message.sender === "user" ? "You" : "Assistant"}: ${message.text}`}
    >
      {message.sender === "assistant" ? (
        <MarkdownRenderer content={message.text} />
      ) : (
        message.text
      )}
    </div>
  </div>
));

const buildPrompt = (userMessage, chatHistory, userProfile) => {
  const recentHistory = chatHistory
    .slice(-10)
    .map(
      (msg, idx) =>
        `Turn ${idx + 1} - ${msg.sender === "user" ? "User" : "Assistant"}: ${msg.text}`
    )
    .join("\n");

  return `
You are CA Copilot, a highly skilled Chartered Accountant AI assistant.
Your role is to provide accurate, concise, and actionable advice on accounting, tax, finance, and compliance for Indian businesses and professionals.

User Profile:
- Name: ${userProfile?.name || "Unknown"}
- Role: ${userProfile?.role || "Not specified"}
- Company: ${userProfile?.company || "Not specified"}

Chat History (last 10 turns):
${recentHistory}

Current User Query:
"${userMessage}"

Instructions:
- Respond in a professional, friendly tone.
- Use bullet points or numbered lists for clarity when appropriate.
- If the query is unclear, ask clarifying questions.
- If you reference laws or rules, cite the relevant section or act.
- If you cannot answer, politely say so and suggest next steps.

Format your response in Markdown.
`;
};

const Chatbot = () => {
  const { userProfile } = useFirebase();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFailedInput, setLastFailedInput] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const chatHistory = useMemo(() => [...messages], [messages]);

  const handleSend = useCallback(
    async (customInput) => {
      const messageToSend = typeof customInput === "string" ? customInput : input.trim();
      if (!messageToSend || loading) return;
      setLoading(true);
      setError(null);

      const userMsg = { sender: "user", text: messageToSend };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");

      try {
        const prompt = buildPrompt(messageToSend, [...chatHistory, userMsg], userProfile);

        const response = await fetch("/api/ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });
        if (!response.ok) throw new Error("AI service error");
        const data = await response.json();

        setMessages((prev) => [
          ...prev,
          { sender: "assistant", text: data.reply || "Sorry, I couldn't generate a response." },
        ]);
        setLastFailedInput(null);
      } catch (err) {
        setError("Something went wrong. Please try again.");
        setLastFailedInput(messageToSend);
      } finally {
        setLoading(false);
      }
    },
    [input, loading, userProfile, chatHistory]
  );

  const handleInputKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <div className="flex flex-col h-full max-h-[80vh] w-full glass-card rounded-2xl shadow-lg p-4">
      <div
        className="flex-1 overflow-y-auto mb-2"
        aria-label="Chat history"
        tabIndex={0}
        style={{ outline: "none" }}
      >
        {messages.length === 0 && (
          <div className="text-gray-400 text-center mt-8">
            Start a conversation with CA Copilot!
          </div>
        )}
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))}
        <div ref={chatEndRef} />
      </div>
      {error && (
        <div className="text-red-600 text-sm mb-2 flex items-center gap-2">
          {error}
          <button
            className="ml-2 underline text-blue-600"
            onClick={() => handleSend(lastFailedInput)}
            aria-label="Retry sending message"
            disabled={loading}
          >
            Retry
          </button>
        </div>
      )}
      <form
        className="flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        aria-label="Chat input form"
      >
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          disabled={loading}
          aria-label="Type your message"
          autoFocus
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded-full bg-blue-600 text-white font-semibold transition ${
            loading || !input.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={loading || !input.trim()}
          aria-label="Send message"
        >
          {loading ? (Spinner ? <Spinner /> : "…") : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Chatbot;