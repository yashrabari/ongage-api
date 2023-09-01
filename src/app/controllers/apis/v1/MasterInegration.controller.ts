import { Request, Response } from "express";
import CryptoJS from "crypto-js";
import { UserIntegrations } from "../../../models/UserIntegrations.Model";
import { MasterIntegration } from "../../../models/MasterIntegration.Model";
import { AppDataSource } from "../../../../config";
import { generateEncryptedData } from "../../../../utils/crypto";

const UserIntegrationsRepo = AppDataSource.getRepository(UserIntegrations);
const MasterIntegrationRepo = AppDataSource.getRepository(MasterIntegration);

const MasterIntegrationController = {
  find: async (req: Request, res: Response) => {
    try {
      const MasterIntegrations = await MasterIntegrationRepo.find();
      res.status(200).json({
        data: generateEncryptedData(MasterIntegrations),
        success: true,
      });
    } catch (err: any) {
      console.log(err?.message);
      return res.status(500).json({ message: err?.message, success: false });
    }
  },
};

export default MasterIntegrationController;
