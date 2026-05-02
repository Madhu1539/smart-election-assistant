/**
 * Chatbot.jsx — Full chat UI with message bubbles and quick suggestions
 */
import { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../services/api';
import './Chatbot.css';

const QUICK_SUGGESTIONS = [
  '📋 How to register to vote?',
  '🔍 I lost my voter ID',
  '📜 My name is not in voter list',
  '🏙️ I shifted to a new city',
  '📍 How to find polling booth?',
  '📅 When are the elections?',
  '✅ Who can vote in India?',
  '📞 Election helpline number',
];

const WELCOME_MESSAGE = {
  id: 'welcome',
  sender: 'bot',
  text: `🙏 **Namaste! I'm your Smart Election Assistant.**

I can help you with:
• 📋 Voter registration process
• 🔍 Lost or duplicate voter ID
• 📜 Name not in voter list
• 🏙️ Shifting to a new city
• 📍 Finding your polling booth
• 📅 Election dates & schedule
• ✅ Eligibility information
• 📞 Helpline contacts

**What would you like to know today?** 👇`,
  timestamp: new Date(),
  quickReplies: ['How to register?', 'Lost voter ID', 'Find polling booth', 'Election dates'],
};

// Format markdown-ish text to HTML
function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>')
    .replace(/•/g, '&bull;');
}

function Chatbot() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    const messageText = text || input.trim();
    if (!messageText || loading) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Add typing indicator
    const typingId = 'typing-' + Date.now();
    setMessages((prev) => [
      ...prev,
      { id: typingId, sender: 'bot', typing: true, timestamp: new Date() },
    ]);

    try {
      const data = await sendChatMessage(messageText);
      // Remove typing and add real response
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== typingId),
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: data.response,
          quickReplies: data.quickReplies || [],
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== typingId),
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: `❌ I'm having trouble connecting. Please try again or call the Election Helpline at **1950**.`,
          quickReplies: ['How to register?', 'Lost voter ID'],
          timestamp: new Date(),
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setInput('');
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-layout">
        {/* Sidebar */}
        <aside className="chatbot-sidebar">
          <div className="sidebar-header">
            <div className="bot-avatar-lg">🤖</div>
            <h3>Election Assistant</h3>
            <p>Instant answers to all voter queries</p>
            <div className="bot-status">
              <span className="status-dot" />
              Online & Ready
            </div>
          </div>

          <div className="sidebar-tips">
            <h4>💡 Quick Help Topics</h4>
            <div className="tips-list">
              {QUICK_SUGGESTIONS.map((tip, i) => (
                <button
                  key={i}
                  className="tip-btn"
                  id={`tip-btn-${i}`}
                  onClick={() => sendMessage(tip.replace(/^[^\s]+ /, ''))}
                >
                  {tip}
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-helpline">
            <span className="helpline-icon">📞</span>
            <div>
              <p className="helpline-label">Voter Helpline</p>
              <p className="helpline-number">1950</p>
              <p className="helpline-hours">8AM–8PM, Mon–Sat</p>
            </div>
          </div>
        </aside>

        {/* Chat Area */}
        <div className="chat-area">
          {/* Chat Header */}
          <div className="chat-header">
            <div className="chat-header-left">
              <div className="bot-avatar-sm">🤖</div>
              <div>
                <h3 className="chat-bot-name">Smart Election Assistant</h3>
                <p className="chat-bot-status">
                  <span className="status-dot-sm" />
                  Online — Instant responses
                </p>
              </div>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={clearChat}
              id="clear-chat-btn"
            >
              🔄 Clear Chat
            </button>
          </div>

          {/* Messages */}
          <div className="messages-container" id="messages-container">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message-wrapper ${msg.sender === 'user' ? 'message-user' : 'message-bot'}`}
              >
                {/* Bot avatar */}
                {msg.sender === 'bot' && (
                  <div className="message-avatar">🤖</div>
                )}

                <div className="message-content">
                  {/* Typing indicator */}
                  {msg.typing ? (
                    <div className="message-bubble bubble-bot typing-bubble">
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                    </div>
                  ) : (
                    <>
                      <div
                        className={`message-bubble ${msg.sender === 'user' ? 'bubble-user' : 'bubble-bot'} ${msg.isError ? 'bubble-error' : ''}`}
                        dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                      />
                      <span className="message-time">
                        {msg.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                      </span>

                      {/* Quick Replies */}
                      {msg.quickReplies && msg.quickReplies.length > 0 && (
                        <div className="quick-replies">
                          {msg.quickReplies.map((reply, i) => (
                            <button
                              key={i}
                              className="quick-reply-btn"
                              id={`quick-reply-${msg.id}-${i}`}
                              onClick={() => sendMessage(reply)}
                            >
                              {reply}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* User avatar */}
                {msg.sender === 'user' && (
                  <div className="message-avatar user-avatar">👤</div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="chat-input-area">
            <div className="chat-input-wrapper">
              <textarea
                ref={inputRef}
                id="chat-input"
                className="chat-input"
                placeholder="Ask me anything about voting... (Press Enter to send)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                disabled={loading}
              />
              <button
                className="send-btn"
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                id="send-message-btn"
                aria-label="Send message"
              >
                {loading ? '⏳' : '➤'}
              </button>
            </div>
            <p className="input-hint">
              💬 Try: "How to register?" · "Lost voter ID" · "Find my booth"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
