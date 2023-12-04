import express, { Request, Response } from "express";
import { getMachineHealth } from "./machineHealth";

const app = express();
const port = 3333;

// Middleware to parse JSON request bodies
app.use(express.json());

app.post("/machine-health", (req: Request, res: Response) => {
  const result = getMachineHealth(req);

  if (result.error) {
    res.status(400).json(result);
  } else {
    res.json(result);
  }
});

app.listen(port, () => {
  console.log(`API is listening at http://localhost:${port}`);
});
