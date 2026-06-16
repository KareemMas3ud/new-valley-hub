import React, { useState, useRef, useEffect } from 'react';
import { FaComments, FaTimes, FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';
import axios from 'axios';
import { BASE } from '../services/api';

const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Ahlan ya habibi! I am Am Sa3ed (عم سعيد). How can I help you explore New Valley today?", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            console.log("Sending request to API...");
            const response = await axios.post(`${BASE}/api/tourism/chat/`, {
                message: userMessage.text
            });
            console.log("API Response:", response.data);

            const aiMessage = { text: response.data.response, sender: 'ai' };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            if (error.response) {
                console.error("Server Error details:", error.response.data);
            }
            const errorMessage = { text: "Ma3lesh (Sorry), I am having trouble connecting right now. Try again later!", sender: 'ai' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-24 z-50 overflow-visible font-sans pointer-events-none">
            {/* Chat Window */}
            <div
                className={`
                    pointer-events-auto
                    transition-all duration-300 ease-in-out transform origin-bottom-right
                    ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
                    rounded-2xl shadow-2xl w-[calc(100vw-2rem)] sm:w-96 flex flex-col mb-4
                `}
                style={{
                    maxHeight: 'calc(100vh - 120px)',
                    height: '500px',
                    maxWidth: '384px',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                }}
            >
                {/* Header */}
                <div
                    className="text-white p-4 rounded-t-2xl flex justify-between items-center shadow-md"
                    style={{ background: `linear-gradient(135deg, var(--bg-footer), var(--tertiary))` }}
                >
                    <div className="flex items-center space-x-2">
                        <div className="p-1.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }}>
                            <FaRobot size={18} style={{ color: '#3B1F1A' }} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">3m Sa3ed 🐫</h3>
                            <p className="text-xs opacity-90">Your Local Guide</p>
                        </div>
                    </div>
                    <button
                        onClick={toggleChat}
                        className="text-white hover:bg-white/20 p-2 rounded-full transition-colors focus:outline-none"
                    >
                        <FaTimes size={18} />
                    </button>
                </div>

                {/* Messages Area */}
                <div
                    className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
                    style={{ backgroundColor: 'var(--bg-primary)' }}
                >
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${msg.sender === 'user' ? 'rounded-br-none' : 'rounded-bl-none'}`}
                                style={msg.sender === 'user'
                                    ? { backgroundColor: 'var(--accent)', color: 'var(--text-primary)' }
                                    : { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }
                                }
                            >
                                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div
                                className="rounded-2xl rounded-bl-none px-4 py-3 text-sm shadow-sm flex items-center space-x-1"
                                style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                            >
                                <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--text-muted)', animationDelay: '0ms' }}></span>
                                <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--text-muted)', animationDelay: '150ms' }}></span>
                                <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--text-muted)', animationDelay: '300ms' }}></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form
                    onSubmit={handleSendMessage}
                    className="p-3 rounded-b-2xl"
                    style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}
                >
                    <div
                        className="flex items-center gap-2 rounded-full px-4 py-2 transition-all"
                        style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--border)' }}
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about New Valley..."
                            className="flex-1 bg-transparent border-none outline-none text-sm"
                            style={{ color: 'var(--text-primary)' }}
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="p-2 rounded-full transition-all"
                            style={{ color: isLoading || !input.trim() ? 'var(--text-muted)' : 'var(--accent)' }}
                        >
                            <FaPaperPlane />
                        </button>
                    </div>
                </form>
            </div>

            {/* Toggle Button */}
            {!isOpen && (
                <div className="fixed bottom-4 right-4 md:bottom-6 md:right-24 z-[100] flex items-center gap-3 pointer-events-none">
                    {/* Call to Action Label */}
                    <div
                        className="hidden sm:block px-4 py-2 rounded-lg shadow-md animate-bounce relative pointer-events-auto"
                        style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
                    >
                        <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Ask 3m Sa3ed 🐫</span>
                        {/* Arrow pointing to button */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                            <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8" style={{ borderLeftColor: 'var(--bg-secondary)' }}></div>
                        </div>
                    </div>

                    {/* Button & Pulse Wrapper */}
                    <div className="relative pointer-events-auto">
                        {/* The Pulse Effect */}
                        <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ backgroundColor: 'var(--accent)' }}></span>

                        {/* The Main Button */}
                        <button
                            onClick={toggleChat}
                            className="relative z-10 w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:scale-95 flex items-center justify-center group"
                            style={{ backgroundColor: 'var(--accent-hover)', color: 'var(--accent-dark)' }}
                        >
                            <span className="material-symbols-outlined text-[28px]">forum</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatbotWidget;
