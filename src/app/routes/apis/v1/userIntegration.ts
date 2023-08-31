import { Router } from "express";
import UserIntegrationsController from "../../../controllers/apis/v1/UsersIntegrations.controller";

const app = Router();

app.get("/", UserIntegrationsController.find);
app.post("/", UserIntegrationsController.create);

export default app;
