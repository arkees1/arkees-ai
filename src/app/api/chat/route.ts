import { NextResponse } from "next/server";

type Msg = { role: "user" | "assistant" | "system"; content: string };

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: Msg[] = body?.messages || [];

    // Basic guard
    if (!messages.length) {
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY missing" },
        { status: 500 }
      );
    }

    // Call OpenAI (Chat Completions)
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are ARKEES AI. Be concise, helpful." },
          ...messages,
        ],
        temperature: 0.6,
      }),
    });

    if (!res.ok) {
      const t = await res.text();
      return NextResponse.json(
        { error: "AI request failed", detail: t },
        { status: 500 }
      );
    }

    const data = await res.json();
    const reply =
      data?.choices?.[0]?.message?.content || "No response";

    return NextResponse.json({ reply });
  } catch (e) {
    return NextResponse.json(
      { error: "Chat failed" },
      { status: 500 }
    );
  }
}
