import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config();

import { createApp } from "./app.js";
import { createSummarizeService } from "./summarizeService.js";

const port = Number(process.env.PORT || 8080);
const app = createApp(createSummarizeService());

app.listen(port, () => {
  console.log(`Node.js ticket summarizer listening on port ${port}`);
});