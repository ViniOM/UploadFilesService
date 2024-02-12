import { app } from "./app";

const porta = process.env.PORTA || 3030;

const server = app.listen(porta, () => {
  console.log(`Rodando em http://localhost:${porta}`);
});

process.on("SIGINT", () => {
  server.close();
  console.log("Servidor parou!");
});
