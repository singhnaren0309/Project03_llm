import express from "express";

export function createApp(summarizeService) {
  if (!summarizeService?.summarize) {
    throw new TypeError("A summarize service is required");
  }

  const app = express();
  app.use(express.text({ type: "*/*", limit: "100kb" }));

  app.post("/api/summarize", async (req, res) => {
    const ticket = typeof req.body === "string" ? req.body : "";
    if (!ticket.trim()) {
      return res.status(400).type("text/plain").send("Ticket text required");
    }

    try {
      const summary = await summarizeService.summarize(ticket);
      return res.status(200).type("text/plain").send(summary);
    } catch (err) {
      console.error("Summary failed", err);
      return res.status(500).type("text/plain").send("Internal Server Error");
    }
  });

  return app;
}

export default createApp;