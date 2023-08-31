import { Router } from "express";
import MasterIntegrationController from "../../../controllers/apis/v1/MasterInegration.controller";

const app = Router();

app.get("/", MasterIntegrationController.find);

export default app;
