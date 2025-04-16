import express from 'express';
import { router } from "./routes";

const app = express();
const port = 3000;

app.use(express.json());

app.get('/terms', (request, response) => {
  return response.json({
    message: "Termos de serviço",
  });
});

app.use("/v1", router);
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:3000`);
});
