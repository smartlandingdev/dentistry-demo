import express from "express";
import cors from "cors";

const app = express();

// Coloque **antes das rotas**
app.use(
  cors({
    origin: "https://dentistry.smartlanding.com.br",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Rotas
app.get("/api/appointments", (req, res) => {
  res.json({ message: "ok" });
});

export default app;
