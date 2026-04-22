import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { productName, productDescription, storeName } = await req.json();

    if (!productName || !productDescription) {
      return new NextResponse("Missing product details", { status: 400 });
    }

    const prompt = `
      You are a world-class ad agency creative director. 
      Generate high-converting ad copy for a product called "${productName}" from the store "${storeName}".
      Product Description: ${productDescription}

      Return a JSON object with the following structure:
      {
        "meta": {
          "headline": "...",
          "primaryText": "...",
          "cta": "..."
        },
        "tiktok": {
          "hook": "...",
          "body": "...",
          "cta": "..."
        },
        "google": {
          "headline": "...",
          "description": "..."
        }
      }
      
      Make the copy punchy, benefit-driven, and tailored to each platform's unique audience.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a professional marketing copywriter." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("Failed to generate ad copy");
    }

    return NextResponse.json(JSON.parse(content));
  } catch (error: any) {
    console.error("[ADS_GENERATE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
