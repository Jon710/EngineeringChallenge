// centralize creation of objects/functions in a factory
import AuthRepository from "../repositories/auth.repository";
import AuthService from "../services/auth.service";
import AuthController from "../controllers/auth.controller";
import MachineRepository from "../repositories/machine.repository";
import MachineService from "../services/machine.service";
import MachineController from "../controllers/machine.controller";

export default ({ server, db }: { server: any; db: any }) => {
  const repositories = {
    auth: AuthRepository({ db }),
    machine: MachineRepository({ db }),
  };

  const services = {
    auth: AuthService({ repositories }),
    machine: MachineService({ repositories }),
  };

  AuthController({ server, services });
  MachineController({ server, services });
};
