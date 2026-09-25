import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, Lightbulb, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface QuestionSet {
  category: string;
  shortLabel: string;
  questions: string[];
}

const QUESTION_SETS: QuestionSet[] = [
  {
    category: 'Подбор в интерьер',
    shortLabel: 'Интерьер',
    questions: [
      'Помогите подобрать картину в гостиную',
      'Какая работа подойдет для светлой спальни?',
      'Как заказать цифровую примерку картины на стену?',
      'Как правильно подобрать цвет багета и тип стекла?'
    ]
  },
  {
    category: 'О картинах коллекции',
    shortLabel: 'О картинах',
    questions: [
      'Расскажите подробнее о картине «Август на подносе»',
      'Какое настроение передает натюрморт «Осеннее тепло»?',
      'Что вдохновило автора на пастель «Дыхание весны»?',
      'Чем особенна картина «Оранжевый аккорд»?'
    ]
  },
  {
    category: 'Техники и мастерство',
    shortLabel: 'Техники',
    questions: [
      'Чем уникальна многослойная авторская акварель?',
      'В чем секрет редкой техники соуса в графике?',
      'В чем разница между масляной живописью и пастелью?',
      'Как правильно ухаживать за картинами дома?'
    ]
  },
  {
    category: 'Покупка и доставка по РФ',
    shortLabel: 'Доставка',
    questions: [
      'Как устроена бережная арт-упаковка для пересылки?',
      'Как оформляется доставка по России через СДЭК?',
      'Прилагается ли авторский сертификат подлинности?',
      'Как проходят частные уроки и мастер-классы?'
    ]
  }
];

const cleanMessageText = (text: string): string => {
  return text
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/#{2,}/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/^[•\-*]\s+/gm, '— ')
    .trim();
};

export const GeminiArtAdvisor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);
  const [questionCategoryIdx, setQuestionCategoryIdx] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Здравствуйте! Рад приветствовать вас в онлайн-галерее Ольги Подколзиной. Я помогу подобрать картину для вашего интерьера, расскажу о техниках живописи или условиях доставки. О чем вы хотели бы узнать?',
      timestamp: 'Сейчас'
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
      setTimeout(() => inputRef.current?.focus(), 200);
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

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const historyPayload = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyPayload })
      });

      if (!res.ok) throw new Error('Network error');

      const data = await res.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: cleanMessageText(data.reply || 'Всегда рад помочь вам с выбором полотен Ольги Подколзиной!'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Всегда рад помочь! Вы также можете связаться с Ольгой лично по телефону +7 (921) 717-71-47.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const currentQuestions = QUESTION_SETS[questionCategoryIdx];

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
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 px-3 sm:px-4 py-2 sm:py-3 rounded-full bg-[#120711]/40 hover:bg-[#200e1e]/75 text-[#E8BD6F] border border-[#D99E41]/35 hover:border-[#D99E41]/70 shadow-lg backdrop-blur-md flex items-center gap-2 transition-all duration-300 cursor-pointer font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase group"
          >
            <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D99E41] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#D99E41]" />
            </span>
            <Sparkles className="w-4 h-4 text-[#D99E41] group-hover:rotate-12 transition-transform duration-300" />
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
            className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[470px] max-h-[88vh] h-[640px] bg-[#1a0e19] border border-[#D99E41]/35 rounded-sm shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            <div className="p-3.5 sm:p-4 bg-[#231221] border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-sm bg-[#D99E41]/15 border border-[#D99E41]/40 flex items-center justify-center text-[#E8BD6F] shrink-0">
                  <Sparkles className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-serif text-base sm:text-lg text-[#FBF5ED] leading-tight">
                    Арт-консультант галереи
                  </h3>
                  <span className="text-xs text-[#BAA898] flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    Ольга Подколзина • AI Куратор
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowQuestions((prev) => !prev)}
                  title="Показать / скрыть варианты вопросов"
                  className={`px-2.5 py-1.5 rounded-sm text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                    showQuestions
                      ? 'bg-[#D99E41]/25 text-[#E8BD6F] border border-[#D99E41]/50'
                      : 'text-[#BAA898] hover:text-[#E8BD6F] hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5 text-[#D99E41]" />
                  <span className="text-[11px] font-medium hidden sm:inline">Вопросы</span>
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  title="Свернуть"
                  className="p-1.5 text-[#BAA898] hover:text-[#EDE4DC] transition-colors rounded-sm hover:bg-white/5 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-xs bg-[#D99E41]/20 border border-[#D99E41]/40 flex items-center justify-center shrink-0 mt-1 text-[#E8BD6F]">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-sm p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#D99E41] text-[#160B14] font-medium shadow-md'
                        : 'bg-[#261324] text-[#EFE7DE] border border-white/10 shadow-md font-light'
                    }`}
                  >
                    <p className="whitespace-pre-line">{cleanMessageText(msg.content)}</p>
                    <div
                      className={`text-[10px] mt-1.5 text-right ${
                        msg.role === 'user' ? 'text-[#48280E]' : 'text-[#8C7B6D]'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-xs bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-1 text-[#F3E8DB]">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 items-center text-[#BAA898] text-sm">
                  <div className="w-7 h-7 rounded-xs bg-[#D99E41]/20 border border-[#D99E41]/40 flex items-center justify-center text-[#E8BD6F]">
                    <Bot className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="px-4 py-2.5 rounded-sm bg-[#281526] border border-white/10 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D99E41] animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-[#D99E41] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-[#D99E41] animate-bounce [animation-delay:0.4s]" />
                    <span className="ml-1 text-xs text-[#BAA898]">Куратор формирует ответ...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {showQuestions && (
              <div className="px-3 sm:px-4 py-2 bg-[#170B16] border-t border-white/5 flex flex-col gap-1.5 shrink-0">
                <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 text-[11px]">
                  <div className="flex items-center gap-1 shrink-0">
                    {QUESTION_SETS.map((set, idx) => (
                      <button
                        key={idx}
                        onClick={() => setQuestionCategoryIdx(idx)}
                        className={`px-2 py-0.5 rounded-xs transition-colors cursor-pointer text-[10.5px] ${
                          idx === questionCategoryIdx
                            ? 'bg-[#D99E41]/20 text-[#E8BD6F] font-semibold border border-[#D99E41]/40'
                            : 'text-[#A8988B] hover:text-[#EDE4DC] hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        {set.shortLabel}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setQuestionCategoryIdx((prev) => (prev + 1) % QUESTION_SETS.length)}
                    className="hover:text-[#EDE4DC] text-[#BAA898] flex items-center gap-1 transition-colors cursor-pointer text-[10.5px] shrink-0 pl-1"
                    title="Следующий блок вопросов"
                  >
                    <span>Еще темы</span>
                    <ArrowRight className="w-3 h-3 text-[#D99E41]" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                  {currentQuestions.questions.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-[11px] px-2.5 py-1 bg-white/5 hover:bg-[#D99E41]/20 border border-white/10 hover:border-[#D99E41]/60 rounded-full text-[#D4C5B8] hover:text-[#FBF5ED] transition-all cursor-pointer text-left leading-snug"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-3 sm:p-4 bg-[#1e0e1c] border-t border-white/10 shrink-0">
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
                  placeholder="Задайте любой вопрос о картинах или интерьере..."
                  className="flex-1 px-4 py-3 bg-[#120711] border border-white/15 focus:border-[#D99E41] rounded-sm text-sm text-[#EDE4DC] placeholder-[#8A7A6E] outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="h-11 px-4 bg-[#D99E41] hover:bg-[#E8BD6F] disabled:opacity-40 disabled:cursor-not-allowed text-[#160B14] rounded-sm flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-md"
                  aria-label="Отправить сообщение"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
