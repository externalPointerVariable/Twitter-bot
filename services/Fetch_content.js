import { HumanMessage } from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import "dotenv/config";

const model = new ChatGoogleGenerativeAI({
  model: "gemma-4-31b-it",
  apiKey: process.env.GOOGLE_API_KEY,
  maxOutputTokens: 2048,
});

export default async function fetchContent(content) {
  const systemPrompt = `You are an investigative tech and current affairs journalist. Your goal is to provide a 'Deep Dive' summary of a trending topic in under 240 characters.

RESEARCH PROTOCOL:

Identify the Core Entities: Look at the headline and snippet. Identify the companies, people, or technologies involved.

Synthesize Impact: Don't just say what happened. Explain why it matters or what the broader implication is (e.g., if a stock is up, explain the market sentiment; if a tech is launched, explain the shift in the industry).

Zero-Click Value: The reader should feel they've gained an insight they didn't have before, without needing to click the link.

STYLE GUIDE:

Tone: Conversational, punchy, and authoritative.

Format: Use a 1-2 sentence lead, followed by a 'The Bottom Line' or 'Why it matters' sentence.

Constraints: Strictly under 240 characters. No hashtags. No AI jargon (e.g., 'delve', 'testament', 'unprecedented').

The content is provided below.`;

  const response = await model.invoke([
    new HumanMessage(
      systemPrompt,
      "Headline = ",
      content.Title,
      " and Content = ",
      content.Content,
    ),
  ]);
  return await response.content[1].text;
}
