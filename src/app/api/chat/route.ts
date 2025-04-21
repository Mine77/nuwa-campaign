import { anthropic } from '@ai-sdk/anthropic';
import { streamText, tool } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const tools = {
        weather: tool({
            description: 'Get the weather in a location (fahrenheit)',
            parameters: z.object({
                location: z.string().describe('The location to get the weather for'),
            }),
            execute: async ({ location }) => {
                const temperature = Math.round(Math.random() * (90 - 32) + 32);
                return {
                    location,
                    temperature,
                };
            },
        }),
    }

    try {
        const { messages } = await req.json();

        if (!process.env.ANTHROPIC_API_KEY) {
            throw new Error('ANTHROPIC_API_KEY is not set');
        }

        const result = await streamText({
            model: anthropic('claude-3-haiku-20240307'),
            messages,
            tools,
            system: 'You are a helpful assistant that can answer questions and help with tasks.',
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