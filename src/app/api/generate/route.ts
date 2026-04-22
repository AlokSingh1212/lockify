import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { NextResponse } from 'next/server';

export const maxDuration = 60; // Allow more time for AI generation

const storefrontSchema = z.object({
  name: z.string().describe('A catchy, brandable name for the store'),
  tagline: z.string().describe('A short, powerful tagline (e.g. "Start selling with a single photo")'),
  description: z.string().describe('A persuasive 2-3 sentence description of the business and its value proposition.'),
  themeColor: z.string().describe('A primary hex color code that fits the brand identity.'),
  products: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      price: z.number().describe('Suggested price in USD'),
      description: z.string(),
      features: z.array(z.string()).describe('List of 3-4 key features/benefits of this product or service'),
      type: z.enum(['digital', 'physical', 'service', 'course', 'community'])
    })
  ).min(1).max(3).describe('Generate 1-3 products or services based on the input')
});

export type StorefrontConfig = z.infer<typeof storefrontSchema>;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const prompt = formData.get('prompt') as string;
    const file = formData.get('file') as File | null;

    if (!prompt && !file) {
      return NextResponse.json({ error: 'Please provide an image or a description' }, { status: 400 });
    }

    // Mock fallback if no API key is present
    if (!process.env.OPENAI_API_KEY) {
      console.log('No OPENAI_API_KEY found, using mock generation response.');
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockStore: StorefrontConfig = {
        name: "ZenFlow Studio",
        tagline: "Find your balance, anywhere.",
        description: "Join our exclusive community of wellness enthusiasts. We offer guided 1:1 sessions, comprehensive digital courses, and a supportive network to help you achieve your fitness goals.",
        themeColor: "#7c3aed",
        products: [
          {
            id: "p1",
            name: "1:1 Virtual Yoga Session",
            price: 50,
            description: "A personalized 60-minute session tailored to your body and goals.",
            features: ["Personalized posture correction", "Custom breathing exercises", "Post-session recovery plan"],
            type: "service"
          },
          {
            id: "p2",
            name: "30-Day Mindfulness Challenge",
            price: 29,
            description: "Build a lasting meditation habit with daily 10-minute guided audio sessions.",
            features: ["Daily audio guides", "Habit tracking workbook", "Community accountability group"],
            type: "course"
          }
        ]
      };
      
      return NextResponse.json({ store: mockStore });
    }

    // Prepare content for OpenAI
    const content: any[] = [];
    
    if (prompt) {
      content.push({ type: 'text', text: `Here is the business idea or prompt: "${prompt}"` });
    }

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const base64String = Buffer.from(arrayBuffer).toString('base64');
      content.push({
        type: 'image',
        image: `data:${file.type};base64,${base64String}`
      });
    }

    content.push({
      type: 'text',
      text: 'You are an expert business consultant and copywriter. Based on the provided image and/or text prompt, instantly generate a complete, high-converting storefront configuration. Be creative, professional, and ensure the products perfectly match the core offering.'
    });

    const { object } = await generateObject({
      model: openai('gpt-4o'),
      schema: storefrontSchema,
      messages: [
        {
          role: 'user',
          content: content,
        },
      ],
    });

    return NextResponse.json({ store: object });

  } catch (error) {
    console.error('Error generating storefront:', error);
    return NextResponse.json({ error: 'Failed to generate storefront' }, { status: 500 });
  }
}
