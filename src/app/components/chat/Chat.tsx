'use client'

import { useChat } from '@ai-sdk/react';
import { useScrollToBottom } from './useScrollToBottom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Missions } from './Missions';
import { MessageContainer } from './MessageContainer';
import { InputContainer } from './InputContainer';
import DotExpandButton from './DotExpandButton';

export function Chat() {
    const { messages, input, handleInputChange, handleSubmit, status, append, setMessages } = useChat();
    const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();
    const [showGridCards, setShowGridCards] = useState(false);

    const handleSelectSuggestion = (suggestion: string) => {
        console.log("handleSelectSuggestion called with:", suggestion);
        if (status === 'streaming') {
            console.log("Ignoring suggestion because status is streaming");
            return;
        }
        console.log("Appending suggestion to chat");
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
                    <Missions
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
                        <div className="flex flex-col h-full">
                            {messages.length > 0 && status !== 'streaming' && (
                                <div className="flex justify-start p-2">
                                    <DotExpandButton
                                        text="Start New Chat"
                                        onClick={handleNewChat}
                                    />
                                </div>
                            )}
                            <MessageContainer
                                messages={messages}
                                status={status}
                                messagesContainerRef={messagesContainerRef as React.RefObject<HTMLDivElement>}
                                messagesEndRef={messagesEndRef as React.RefObject<HTMLDivElement>}
                            />
                            <div className="p-4 space-y-4">
                                {messages.length === 0 && (
                                    <Missions
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
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
} 