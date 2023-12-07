import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Button } from "react-native";
import { useMachines } from "../context/machines";
import { LineChart } from "react-native-chart-kit";
import Picker from "../../components/Picker";
import { MachineType } from "../../data/types";
import { useAuth } from "../context/auth";

const machineNames = [
  { label: "Welding Robot", value: MachineType.WeldingRobot },
  { label: "PaintingStation", value: MachineType.PaintingStation },
  { label: "Assembly Line", value: MachineType.AssemblyLine },
  {
    label: "Quality Control Station",
    value: MachineType.QualityControlStation,
  },
];

export default function Graph() {
  const { machines } = useMachines();
  const { signOut } = useAuth();
  const [machineName, setMachineName] = useState("paintingStation");
  const [machineScores, setMachineScores] = useState([0]);

  const createdAt = machines?.map((machine) => {
    const [hours, minutes] = machine.formattedDate.split(":");
    return `${hours}h:${minutes}m`;
  });

  useEffect(() => {
    const currentScore = getMachineScores(machineName);
    setMachineScores(currentScore);
  }, [machineName]);

  const getMachineScores = (machineName: string) => {
    return machines?.map((machine) =>
      Number(machine?.machine_scores[machineName])
    );
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: createdAt,
          datasets: [{ data: machineScores }],
        }}
        width={Dimensions.get("window").width - 10}
        height={350}
        yAxisSuffix="pts"
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: { r: "6", strokeWidth: "2", stroke: "#ffa726" },
        }}
        bezier
        style={{ marginVertical: 8, borderRadius: 16 }}
      />

      <Text style={styles.label}>Machine Name</Text>
      <View>
        <Picker
          value={machineName}
          onSetValue={setMachineName}
          items={machineNames}
        />
      </View>

      <View style={{ marginTop: 50 }}>
        <Button
          title="Logout"
          onPress={async () => signOut()}
          color="#FF0000"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});
