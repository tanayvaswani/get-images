import { Hono } from "hono";

type CloudflareBindings = {
  AI: Ai;
};

const app = new Hono<{
  Bindings: CloudflareBindings;
  Variables: {
    AI: Ai;
  };
}>();

app.get("/", (c) => {
  c.env.AI;
  return c.json({ detail: "Hono API is Up!" });
});

app.get("/ask", async (c) => {
  const response = await c.env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
    messages: [
      {
        role: "system",
        content: `You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question. If you don't know the answer, just say that you don't know.`,
      },
      {
        role: "user",
        content: "Tell me the name of capital of Australia",
      },
    ],
  });

  return c.json({ detail: response });
});

export default app;
