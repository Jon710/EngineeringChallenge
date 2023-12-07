export enum MachineType {
  WeldingRobot = "weldingRobot",
  PaintingStation = "paintingStation",
  AssemblyLine = "assemblyLine",
  QualityControlStation = "qualityControlStation",
}

export enum WeldingRobotPart {
  ErrorRate = "errorRate",
  VibrationLevel = "vibrationLevel",
  ElectrodeWear = "electrodeWear",
  ShieldingPressure = "shieldingPressure",
  WireFeedRate = "wireFeedRate",
  ArcStability = "arcStability",
  SeamWidth = "seamWidth",
  CoolingEfficiency = "coolingEfficiency",
}

export enum PaintingStationPart {
  FlowRate = "flowRate",
  Pressure = "pressure",
  ColorConsistency = "colorConsistency",
  NozzleCondition = "nozzleCondition",
}

export enum AssemblyLinePart {
  AlignmentAccuracy = "alignmentAccuracy",
  Speed = "speed",
  FittingTolerance = "fittingTolerance",
  BeltSpeed = "beltSpeed",
}

export enum QualityControlStationPart {
  CameraCalibration = "cameraCalibration",
  LightIntensity = "lightIntensity",
  SoftwareVersion = "softwareVersion",
  CriteriaSettings = "criteriaSettings",
}

export type partInfo = {
  name:
    | WeldingRobotPart
    | PaintingStationPart
    | AssemblyLinePart
    | QualityControlStationPart;
  value: number;
};

export const machineNames = {
  [MachineType.WeldingRobot]: "Welding Robot",
  [MachineType.PaintingStation]: "Painting Station",
  [MachineType.AssemblyLine]: "Assembly Line",
  [MachineType.QualityControlStation]: "Quality Control Station",
};

export type User = {
  username: string;
  email: string;
  token: string;
  id: number;
};

export interface SignInResponse {
  data: User | undefined;
  error: Error | undefined;
}

export interface SignOutResponse {
  error: any | undefined;
  data: {} | undefined;
}

export interface AuthContextValue {
  signIn: (e: string, p: string) => Promise<SignInResponse>;
  signUp: (e: string, p: string, n: string) => Promise<SignInResponse>;
  signOut: () => Promise<SignOutResponse>;
  user: User | null;
  authInitialized: boolean;
}

export interface ProviderProps {
  children: React.ReactNode;
}
