import React from "react";
import { Text } from "react-native";
import { machineNames } from "../data/types";

export const MachineScore = ({
  machineName,
  score,
}: {
  machineName: string;
  score: string;
}) => {
  return (
    <>{score && <Text>{`${machineNames[machineName]}: ${score}`}</Text>}</>
  );
};
