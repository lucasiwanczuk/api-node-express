import express from "express";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import swaggerDocs from "./swagger.json";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api-doc" , swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.get('/terms', (request, response) => {
  return response.json({
    message: "Termos de serviço",
  });
});

app.use("/v1", router);
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:3000`);
});
