import { UserIntegrations } from "../../../models/UserIntegrations.Model";
import { MasterIntegration } from "../../../models/MasterIntegration.Model";
import { AppDataSource } from "../../../../config";
import { Request, Response } from "express";

const UserIntegrationsRepo = AppDataSource.getRepository(UserIntegrations);
const MasterIntegrationRepo = AppDataSource.getRepository(MasterIntegration);

const MasterIntegrationController = {
  find: async (req: Request, res: Response) => {
    try {
      const MasterIntegrations = await MasterIntegrationRepo.find();
      res.status(200).json({ data: MasterIntegrations, success: true });
    } catch (err: any) {
      console.log(err?.message);
      return res.status(500).json({ message: err?.message, success: false });
    }
  },
};

export default MasterIntegrationController;
