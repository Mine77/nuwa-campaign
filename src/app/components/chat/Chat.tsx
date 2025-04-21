'use client'

import { useChat } from '@ai-sdk/react';
import { useScrollToBottom } from './useScrollToBottom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activities } from './Activities';
import { MessageContainer } from './MessageContainer';
import { InputContainer } from './InputContainer';
import { FiPlus } from "react-icons/fi";

export function Chat() {
    const { messages, input, handleInputChange, handleSubmit, status, append, setMessages } = useChat();
    const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();
    const [showGridCards, setShowGridCards] = useState(false);

    const handleSelectSuggestion = (suggestion: string) => {
        if (status === 'streaming') return;
        append({ role: 'user', content: suggestion });
    };

    const handleInputChangeWrapper = (value: string) => {
        handleInputChange({ target: { value } } as any);
    };

    const handleShowGridCards = () => {
        setShowGridCards(true);
    };

    const handleCloseGridCards = () => {
        setShowGridCards(false);
    };

    const handleNewChat = () => {
        if (status === 'streaming') return;
        setMessages([]);
        handleInputChangeWrapper('');
    };

    return (
        <div className="flex flex-col h-[calc(100vh-120px)] bg-background rounded-xl">
            <AnimatePresence mode="wait">
                {showGridCards ? (
                    <Activities
                        showGridCards={showGridCards}
                        onCloseGridCards={handleCloseGridCards}
                        onSelectSuggestion={handleSelectSuggestion}
                        onShowGridCards={handleShowGridCards}
                    />
                ) : (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="flex flex-col h-full"
                    >
                        <div className="flex justify-start p-2">
                            <button
                                onClick={handleNewChat}
                                hidden={status === 'streaming' || messages.length === 0}
                                className="px-4 py-2 rounded-full flex items-center gap-2 text-slate-500 
                                    
                                    transition-all duration-300
                                    hover:shadow-[1px_1px_5px_rgba(0,0,0,0.3),-1px_-1px_5px_rgba(255,255,255,0.6),inset_2px_2px_4px_rgba(0,0,0,0.3),inset_-2px_-2px_5px_rgba(255,255,255,1)]
                                    hover:text-violet-500
                                    disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FiPlus className="w-5 h-5" />
                                <span>Start New Chat</span>
                            </button>
                        </div>
                        <MessageContainer
                            messages={messages}
                            status={status}
                            messagesContainerRef={messagesContainerRef as React.RefObject<HTMLDivElement>}
                            messagesEndRef={messagesEndRef as React.RefObject<HTMLDivElement>}
                        />
                        <div className="p-4 space-y-4">
                            {messages.length === 0 && (
                                <Activities
                                    showGridCards={showGridCards}
                                    onCloseGridCards={handleCloseGridCards}
                                    onSelectSuggestion={handleSelectSuggestion}
                                    onShowGridCards={handleShowGridCards}
                                />
                            )}
                            <InputContainer
                                input={input}
                                onInputChange={handleInputChangeWrapper}
                                onSubmit={handleSubmit}
                                isStreaming={status === 'streaming'}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
} 