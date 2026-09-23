import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const STARTER_PROMPTS = [
  'Привет! Помогите выбрать картину',
  'Расскажите о технике лессировки',
  'Как заказать картину под интерьер?',
  'Уроки живописи в Санкт-Петербурге'
];

export const GeminiArtAdvisor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Здравствуйте! Я персональный арт-консультант галереи Ольги Подколзиной. Могу помочь подобрать картину под освещение и стиль вашего интерьера, рассказать о многослойной лессировке или записать на академические мастер-классы. О чем бы вы хотели узнать?',
      timestamp: 'Только что'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const apiMessages = newMessages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role === 'user' ? 'user' : 'model',
          content: m.content
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: apiMessages })
      });

      if (!res.ok) {
        throw new Error('Сбой сети при запросе к арт-консультанту');
      }

      const data = await res.json();
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || 'Благодарю за вопрос! Сейчас мастерская обрабатывает ваш запрос.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Всегда рад помочь! Вы также можете связаться с Ольгой лично по телефону +7 (921) 717-71-47 или в Telegram.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Беседа начата заново. Чем могу помочь вам сегодня в выборе живописи или графики?',
        timestamp: 'Только что'
      }
    ]);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            aria-label="Открыть арт-консультанта"
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 px-3 sm:px-4 py-2 sm:py-3 rounded-full bg-[#2A1525]/95 text-[#E8BD6F] border border-[#D99E41]/50 shadow-2xl backdrop-blur-md flex items-center gap-2 hover:bg-[#381B32] hover:border-[#D99E41] hover:shadow-[0_0_20px_rgba(217,158,65,0.4)] transition-all duration-300 cursor-pointer font-sans text-[11px] sm:text-xs font-semibold tracking-wider uppercase group"
          >
            <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D99E41] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#D99E41]" />
            </span>
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D99E41] group-hover:rotate-12 transition-transform duration-300" />
            <span className="hidden sm:inline">Арт-консультант</span>
            <span className="sm:hidden">Арт-гид</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[85vh] h-[580px] bg-[#1a0e19] border border-[#D99E41]/35 rounded-sm shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            <div className="p-4 bg-[#231221] border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-sm bg-[#D99E41]/15 border border-[#D99E41]/40 flex items-center justify-center text-[#E8BD6F]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-base text-[#FBF5ED] leading-tight flex items-center gap-1.5">
                    <span>Арт-консультант галереи</span>
                  </h3>
                  <span className="text-[11px] text-[#A89788] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Ольга Подколзина • AI Куратор
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="Начать диалог сначала"
                  className="p-1.5 text-[#A89788] hover:text-[#E8BD6F] transition-colors rounded-sm hover:bg-white/5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Свернуть"
                  className="p-1.5 text-[#A89788] hover:text-[#EDE4DC] transition-colors rounded-sm hover:bg-white/5 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-xs bg-[#D99E41]/20 border border-[#D99E41]/40 flex items-center justify-center shrink-0 mt-1 text-[#E8BD6F]">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-sm p-3 leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#D99E41] text-[#160B14] font-medium'
                        : 'bg-[#261524] text-[#EDE4DC] border border-white/10'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                    <div
                      className={`text-[9px] mt-1 text-right ${
                        msg.role === 'user' ? 'text-[#160B14]/70' : 'text-[#8A7B6E]'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-6 h-6 rounded-xs bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-1 text-[#F3E8DB]">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5 items-center text-[#A89788] text-[11px]">
                  <div className="w-6 h-6 rounded-xs bg-[#D99E41]/20 border border-[#D99E41]/40 flex items-center justify-center text-[#E8BD6F]">
                    <Bot className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                  <div className="px-3 py-2 rounded-sm bg-[#261524] border border-white/10 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D99E41] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D99E41] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D99E41] animate-bounce [animation-delay:0.4s]" />
                    <span className="ml-1 text-[10px] text-[#A89788]">Куратор формулирует ответ...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length <= 2 && (
              <div className="px-4 pb-2 pt-1 flex flex-wrap gap-1.5">
                {STARTER_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="text-[11px] px-2.5 py-1 bg-white/5 hover:bg-[#D99E41]/20 border border-white/10 hover:border-[#D99E41]/60 rounded-full text-[#C8B8A8] hover:text-[#F3E8DB] transition-all cursor-pointer whitespace-nowrap"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            <div className="p-3 bg-[#1e0e1c] border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Спросите о картинах, ценах или обучении..."
                  className="flex-1 px-3 py-2 bg-[#120711] border border-white/15 focus:border-[#D99E41] rounded-sm text-xs text-[#EDE4DC] outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="h-8 px-3.5 bg-[#D99E41] hover:bg-[#E8BD6F] disabled:opacity-40 disabled:cursor-not-allowed text-[#160B14] rounded-sm flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Отправить сообщение"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
