// import auth from "../middleware/auth";
import { Request, Response } from "express";

function Auth({ server, services }: { server: any; services: any }) {
  server.post("/sign-up", async (req: Request, res: Response) => {
    try {
      const { email, password, username } = req.body;

      const { message, statusCode } = await services.auth.createUser({
        email,
        password,
        username,
      });

      return res.status(statusCode).json(message);
    } catch (error: any) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  });

  server.post("/sign-in", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await services.auth.signIn({ email, password });

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  });
}

export default Auth;
