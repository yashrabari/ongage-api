import { Router } from "express";

const app = Router();

app.use("/user-integration", require("./userIntegration").default);
app.use("/master-integration", require("./masterIntegrations").default);

export default app;
