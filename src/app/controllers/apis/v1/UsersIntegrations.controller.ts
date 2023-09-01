import { UserIntegrations } from "../../../models/UserIntegrations.Model";
import { MasterIntegration } from "../../../models/MasterIntegration.Model";
import { AppDataSource } from "../../../../config";
import { Request, Response } from "express";
import { decryptData, generateEncryptedData } from "../../../../utils/crypto";

const UserIntegrationsRepo = AppDataSource.getRepository(UserIntegrations);
const MasterIntegrationRepo = AppDataSource.getRepository(MasterIntegration);

const UserIntegrationsController = {
  find: async (req: Request, res: Response) => {
    try {
      const { userId } = req.query;

      if (!userId) {
        return res.status(400).json({ message: "Bad Request" });
      }
      const userIntegrations = await UserIntegrationsRepo.find({
        where: { userId: userId?.toString() },
        relations: ["masterIntegration"],
      });

      res
        .status(200)
        .json({ data: generateEncryptedData(userIntegrations), success: true });
    } catch (err: any) {
      console.log(err?.message);
      return res.status(500).json({ message: err?.message, success: false });
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const data = decryptData(req.body.data);
      const {
        userId,
        masterIntegrationId,
        accountCode,
        username,
        password,
        isTestCampaign,
        listAutomatically,
      } = data;

      if (!userId || !masterIntegrationId) {
        return res.status(400).json({ message: "Bad Request" });
      }

      //create new user integration
      const userIntegration = new UserIntegrations();
      userIntegration.userId = userId;
      userIntegration.masterIntegration = masterIntegrationId;
      userIntegration.accountCode = accountCode;
      userIntegration.username = generateEncryptedData(username);
      userIntegration.password = generateEncryptedData(password);
      userIntegration.combination = `${userId}:${masterIntegrationId}`;
      userIntegration.isTestCampaign = isTestCampaign;
      userIntegration.listAutomatically = listAutomatically;
      userIntegration.createdAt = new Date();
      userIntegration.updatedAt = new Date();

      var newRecord = await UserIntegrationsRepo.save(userIntegration);

      return res
        .status(200)
        .json({ data: generateEncryptedData(newRecord), success: true });
    } catch (err: any) {
      console.log(err?.message);
      return res.status(500).json({ message: err?.message, success: false });
    }
  },
};

export default UserIntegrationsController;
