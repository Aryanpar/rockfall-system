import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(request: NextRequest) {
  try {
    const { query, context } = await request.json()

    const prompt = `
You are RockGuard AI, an expert mining safety assistant specializing in rockfall prediction and mine safety protocols. 

Context: ${context || "General mining safety inquiry"}

User Question: ${query}

Please provide a comprehensive, professional response that:
1. Addresses the specific safety concern
2. Provides actionable recommendations
3. References relevant safety protocols
4. Considers both immediate and long-term safety implications

Keep your response focused on mining safety, rockfall prevention, and worker protection.
`

    const { text } = await generateText({
      model: groq("llama-3.1-70b-versatile"),
      prompt,
      temperature: 0.4,
    })

    return NextResponse.json({
      response: text,
      timestamp: new Date().toISOString(),
      model: "Groq Llama 3.1 70B",
    })
  } catch (error) {
    console.error("AI Analysis Error:", error)
    return NextResponse.json({ error: "Failed to generate AI analysis" }, { status: 500 })
  }
}
