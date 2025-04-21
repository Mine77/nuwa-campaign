'use client'

import { useChat } from '@ai-sdk/react';
import { Message as MessageComponent } from './Message';
import { ChatInput } from './ChatInput';
import { useScrollToBottom } from './useScrollToBottom';
import { Greeting } from './Greeting';
import { SuggestedActions } from './SuggestedActions';
import { LoadingDots } from './LoadingDots';

export function Chat() {
    const { messages, input, handleInputChange, handleSubmit, status, append } = useChat();
    const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();

    const handleSelectSuggestion = (suggestion: string) => {
        if (status === 'streaming') return;
        append({ role: 'user', content: suggestion });
    };

    const handleInputChangeWrapper = (value: string) => {
        handleInputChange({ target: { value } } as any);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-120px)] bg-background rounded-xl">
            {/* Messages Container */}
            <div
                ref={messagesContainerRef}
                role="log"
                aria-live="polite"
                className={`flex-1 p-4 space-y-4 bg-white dark:bg-gray-900 ${messages.length > 0 ? 'overflow-y-auto' : 'overflow-hidden'}`}
            >
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <Greeting />
                    </div>
                ) : (
                    <>
                        {messages.map((message) => (
                            <MessageComponent
                                key={message.id}
                                message={message}
                            />
                        ))}
                        {(status === 'streaming' || status === 'submitted') && (
                            <div className="flex items-center justify-start gap-4 px-4">
                                <div className="size-10 flex items-center rounded-full justify-center shrink-0">
                                    {status === 'submitted' && (
                                        <img
                                            src="/nuwa.svg"
                                            alt="Nuwa Logo"
                                            className="size-6"
                                        />
                                    )}
                                </div>
                                <div className="flex items-center justify-center">
                                    <LoadingDots />
                                </div>
                            </div>
                        )}
                    </>
                )}
                <div ref={messagesEndRef} className="shrink-0 min-w-[24px] min-h-[24px]" />
            </div>

            {/* Suggested Actions and Input Form */}
            <div className="p-4 space-y-4">
                {messages.length === 0 && (
                    <SuggestedActions onSelectSuggestion={handleSelectSuggestion} />
                )}
                <ChatInput
                    value={input}
                    onChange={handleInputChangeWrapper}
                    onSubmit={handleSubmit}
                    isStreaming={status === 'streaming'}
                />
            </div>
        </div>
    );
} 