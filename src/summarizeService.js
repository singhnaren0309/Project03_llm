import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import Groq from "groq-sdk";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config();

const DEFAULT_MODEL = "groq/compound";

export function createSummarizeService({
  client = new Groq({ apiKey: process.env.GROQ_API_KEY }),
  model = DEFAULT_MODEL,
} = {}) {
  return {
    async summarize(ticket) {
      const response = await client.chat.completions.create({
        model,
        messages: [
          {
            role: "user",
            content: `Summarize this support ticket in 2 lines:\n\n${ticket}`,
          },
        ],
      });

      const summary = response.choices?.[0]?.message?.content;

      if (!summary) {
        throw new Error("Groq returned an empty summary");
      }

      return summary;
    },
  };
}