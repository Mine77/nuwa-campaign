import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import React from 'react';
import Image from 'next/image';
import { UIMessage } from 'ai';

// 类型定义
type MessageRole = 'user' | 'assistant' | 'system';
type MessagePartType = 'text' | 'tool-invocation';

interface MessagePart {
    type: MessagePartType;
    text?: string;
    toolInvocation?: any;
}

interface MessageProps {
    message: UIMessage;
}

// 样式工具函数
const getMessageContainerClass = (role: MessageRole): string => {
    switch (role) {
        case 'user':
            return 'justify-end';
        default:
            return 'justify-start';
    }
};

const getMessageContentClass = (role: MessageRole): string => {
    switch (role) {
        case 'user':
            return 'items-end max-w-2xl md:max-w-3xl';
        default:
            return 'w-full';
    }
};

const getMessageBubbleClass = (role: MessageRole, partType?: MessagePartType): string => {
    switch (role) {
        case 'user':
            return 'bg-indigo-600 text-white [&_*]:text-white px-3 py-2 rounded-xl';
        default:
            return partType === 'tool-invocation'
                ? 'bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-xl font-mono text-sm'
                : 'bg-muted px-3 py-2 rounded-xl';
    }
};

// Markdown 组件配置
const markdownComponents = {
    code: ({ node, inline, className, children, ...props }: any) => {
        const match = /language-(\w+)/.exec(className || '');
        return !inline && match ? (
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto max-w-full">
                <code className={className} {...props}>
                    {children}
                </code>
            </pre>
        ) : (
            <code className="bg-muted px-1 py-0.5 rounded" {...props}>
                {children}
            </code>
        );
    },
    pre: ({ children }: any) => <>{children}</>,
    a: ({ node, children, ...props }: any) => (
        <a
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noreferrer"
            {...props}
        >
            {children}
        </a>
    ),
    p: ({ children }: any) => <p className="mb-4 last:mb-0">{children}</p>,
    ul: ({ children }: any) => (
        <ul className="list-disc list-outside ml-4 mb-4">{children}</ul>
    ),
    ol: ({ children }: any) => (
        <ol className="list-decimal list-outside ml-4 mb-4">{children}</ol>
    ),
    li: ({ children }: any) => <li className="mb-1">{children}</li>,
    h1: ({ children }: any) => (
        <h1 className="text-2xl font-bold mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
        <h2 className="text-xl font-bold mb-3">{children}</h2>
    ),
    h3: ({ children }: any) => (
        <h3 className="text-lg font-bold mb-2">{children}</h3>
    ),
    blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-muted pl-4 italic mb-4">
            {children}
        </blockquote>
    ),
    img: ({ node, src, alt, ...props }: any) => {
        const [isError, setIsError] = React.useState(false);

        if (!src) {
            return (
                <div className="text-red-500 text-sm my-4">
                    Invalid image source
                </div>
            );
        }

        return (
            <div className="relative my-4 w-full">
                {isError ? (
                    <div className="text-red-500 text-sm">
                        Failed to load image: {alt}
                    </div>
                ) : (
                    <div className="relative w-full aspect-video">
                        <Image
                            src={src}
                            alt={alt || ''}
                            fill
                            className="object-contain rounded-lg"
                            onError={() => setIsError(true)}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={false}
                        />
                    </div>
                )}
            </div>
        );
    },
};

// 消息内容渲染组件
const MessageContent: React.FC<{ part: MessagePart }> = ({ part }) => {
    switch (part.type) {
        case 'tool-invocation':
            return (
                <pre className="m-0 whitespace-pre">
                    {JSON.stringify(part.toolInvocation, null, 2)}
                </pre>
            );
        case 'text':
            return (
                <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                        components={markdownComponents}
                    >
                        {part.text}
                    </ReactMarkdown>
                </div>
            );
        default:
            return null;
    }
};

// 消息气泡组件
const MessageBubble: React.FC<{ part: MessagePart; content: string }> = ({ part, content }) => {
    return (
        <div className="flex flex-col gap-4">
            <MessageContent part={part} />
        </div>
    );
};

// 头像组件
const Avatar: React.FC<{ role: MessageRole }> = ({ role }) => {
    if (role !== 'assistant') return null;

    return (
        <div className="size-10 flex items-center rounded-full justify-center shrink-0">
            <img
                src="/nuwa.svg"
                alt="Nuwa Logo"
                className="size-6"
            />
        </div>
    );
};

// 主消息组件
export function Message({ message }: MessageProps) {
    const { role, parts } = message;

    return (
        <AnimatePresence>
            <motion.div
                data-testid={`message-${role}`}
                className="w-full mx-auto px-4 group/message"
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                data-role={role}
            >
                <div className={`flex gap-4 w-full ${getMessageContainerClass(role as MessageRole)}`}>
                    <Avatar role={role as MessageRole} />

                    <div className={`flex flex-col gap-4 ${getMessageContentClass(role as MessageRole)}`}>
                        <div className="flex flex-col gap-2 w-full">
                            {parts.map((part, i) => (
                                <div
                                    key={`${message.id}-${i}`}
                                    className={`flex flex-col gap-4 ${getMessageBubbleClass(role as MessageRole, part.type as MessagePartType)}`}
                                >
                                    <MessageContent part={part as MessagePart} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
} 