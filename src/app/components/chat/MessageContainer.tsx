import { Message as MessageComponent } from './Message';
import { Greeting } from './Greeting';
import { LoadingDots } from './LoadingDots';
import { Message } from '@ai-sdk/react';

interface MessageContainerProps {
    messages: Message[];
    status: string;
    messagesContainerRef: React.RefObject<HTMLDivElement>;
    messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function MessageContainer({
    messages,
    status,
    messagesContainerRef,
    messagesEndRef
}: MessageContainerProps) {
    return (
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
                            message={message as any}
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
    );
} 