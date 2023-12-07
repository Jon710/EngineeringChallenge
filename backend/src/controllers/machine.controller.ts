// import auth from "../middleware/auth";
import { Request, Response } from "express";
import { getMachineHealth } from "../../machineHealth";

// TODO: Auth middleware to be added
function Machine({ server, services }: { server: any; services: any }) {
  server.post("/machine-health", (req: Request, res: Response) => {
    const result = getMachineHealth(req);

    if (result.error) {
      res.status(400).json(result);
    } else {
      res.json(result);
    }
  });

  server.post("/machines", async (req: Request, res: Response) => {
    try {
      const { machines, userId } = req.body;

      const { message, statusCode } = await services.machine.saveMachineData({
        machines,
        userId,
      });

      return res.status(statusCode).json(message);
    } catch (error: any) {
      console.log(error);
      return res.status(error.statusCode).json({ error: error.message });
    }
  });

  server.get(
    "/user/:userId/machine-state",
    async (req: Request, res: Response) => {
      try {
        const { userId } = req.params;

        const data = await services.machine.fetchUserMachineData(userId);

        return res.status(200).json(data);
      } catch (error: any) {
        console.log(error);
        return res.status(error.statusCode).json({ error: error.message });
      }
    }
  );
}

export default Machine;
