import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import { tools } from './tools';
import { getIrisSystemPrompt } from '../systemPrompts/iris-agent';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages, userInfo } = await req.json();

        if (!process.env.ANTHROPIC_API_KEY) {
            throw new Error('ANTHROPIC_API_KEY is not set');
        }

        // 使用客户端传递的用户信息生成系统提示
        const systemPrompt = getIrisSystemPrompt(userInfo || {});

        const result = await streamText({
            model: anthropic('claude-3-5-sonnet-20241022'),
            messages,
            tools,
            system: systemPrompt,
            maxSteps: 5,
            toolChoice: 'auto'
        });

        return result.toDataStreamResponse();
    } catch (error) {
        console.error('Error in chat API:', error);

        // 创建一个 ReadableStream 来发送 SSE 格式的错误消息
        const stream = new ReadableStream({
            start(controller) {
                const errorMessage = JSON.stringify({
                    error: error instanceof Error ? error.message : 'Failed to generate response'
                });
                controller.enqueue(new TextEncoder().encode(`data: ${errorMessage}\n\n`));
                controller.close();
            }
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
    }
}