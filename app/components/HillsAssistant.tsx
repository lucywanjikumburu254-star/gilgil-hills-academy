"use client";

import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";

type ChatMessage = { role: "user" | "assistant"; text: string };


function formatInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
}

function AssistantReply({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (!listItems.length) return;
    blocks.push(
      <ul className="hills-reply-list" key={`list-${blocks.length}`}>
        {listItems.map((item, index) => <li key={index}>{formatInline(item)}</li>)}
      </ul>
    );
    listItems = [];
  };

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();
    if (!line) {
      flushList();
      return;
    }
    if (/^[-•*]\s+/.test(line)) {
      listItems.push(line.replace(/^[-•*]\s+/, ""));
      return;
    }
    flushList();
    if (/^#{1,3}\s+/.test(line)) {
      blocks.push(<h4 className="hills-reply-heading" key={index}>{formatInline(line.replace(/^#{1,3}\s+/, ""))}</h4>);
    } else {
      blocks.push(<p className="hills-reply-paragraph" key={index}>{formatInline(line)}</p>);
    }
  });
  flushList();
  return <div className="hills-assistant-reply">{blocks}</div>;
}
const quickQuestions = [
  { label: "Our academics", icon: "▤", prompt: "Tell me about the academic programmes and grade levels." },
  { label: "Admissions", icon: "▣", prompt: "How do I apply for admission?" },
  { label: "School fees", icon: "▱", prompt: "How can I get the current school fees?" },
  { label: "Boarding", icon: "▰", prompt: "Tell me about boarding at the school." },
  { label: "School activities", icon: "▦", prompt: "What school activities and co-curricular opportunities are available?" },
  { label: "Our location", icon: "⌖", prompt: "Where is Gilgil Hills Academy located?" }
];

export default function HillsAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending, open]);

  async function sendMessage(text: string) {
    const question = text.trim();
    if (!question || sending) return;
    const nextMessages: ChatMessage[] = [...messages, { role: "user", text: question }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setSending(true);
    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.slice(-12).map((message) => ({
            role: message.role,
            text: message.text
          }))
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "I couldn't answer just now. Please contact the school office.");
      setMessages((current) => [...current, { role: "assistant", text: data.reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="hills-assistant-root">
      {open && (
        <section className="hills-chat-panel" aria-label="Hills Assistant chat">
          <header className="hills-chat-header">
            <div className="hills-chat-brand">
              <img src="https://res.cloudinary.com/azrvy9ub/image/upload/v1794316527/1794316169002.jpg" alt="Gilgil Hills Academy crest" />
              <div><strong>Hills Assistant</strong><span><i /> Online · School information</span></div>
            </div>
            <button className="hills-window-control" type="button" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </header>
          <div className="hills-chat-tagline">Your guide to a brighter future.</div>
          <div className="hills-chat-messages" ref={listRef} aria-live="polite">
            <div className="hills-welcome-row">
              <div className="hills-robot" aria-hidden="true"><span>● ●</span><small>GHA</small></div>
              <div className="hills-bubble hills-assistant-bubble">
                <strong>Hello! 👋</strong>
                <p>Welcome to Gilgil Hills Academy. I'm your school assistant. How can I help you today?</p>
              </div>
            </div>
            {messages.map((message, index) => (
              <div className={message.role === "user" ? "hills-message hills-user-message" : "hills-message hills-assistant-message"} key={index}>
                <div className="hills-bubble">{message.role === "assistant" ? <AssistantReply text={message.text} /> : <p>{message.text}</p>}</div>
              </div>
            ))}
            {sending && <div className="hills-message hills-assistant-message"><div className="hills-bubble hills-typing"><i /><i /><i /><span>Thinking…</span></div></div>}
            {error && <div className="hills-chat-error" role="alert">{error} <a href="https://wa.me/254794952635" target="_blank" rel="noreferrer">Chat with the school on WhatsApp</a></div>}
            {messages.length === 0 && (
              <div className="hills-quick-section">
                <strong>What would you like to know?</strong>
                <div className="hills-quick-grid">
                  {quickQuestions.map((item) => (
                    <button type="button" key={item.label} onClick={() => void sendMessage(item.prompt)} disabled={sending}>
                      <span>{item.icon}</span>{item.label}
                    </button>
                  ))}
                </div>
                <p className="hills-ask-anything">ⓘ You can also ask me anything about the school in your own words.</p>
              </div>
            )}
          </div>
          <form className="hills-chat-form" onSubmit={handleSubmit}>
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Type your question..." aria-label="Type your question" maxLength={1000} />
            <button type="submit" disabled={!input.trim() || sending} aria-label="Send message">➤</button>
          </form>
          <div className="hills-chat-footer">◆ Powered by Gilgil Hills Academy AI Assistant</div>
        </section>
      )}
      <button className={open ? "hills-chat-launcher is-open" : "hills-chat-launcher"} type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close Hills Assistant" : "Chat with Hills Assistant"}>
        {open ? "×" : <><span className="hills-launcher-spark">✦</span><span className="hills-launcher-chat">▰</span></>}
      </button>
      {!open && <span className="hills-chat-hint">Chat with Hills Assistant</span>}
    </div>
  );
}
