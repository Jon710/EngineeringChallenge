import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import { useMachineData } from "../useMachineData";
import { useCallback } from "react";
import { PartsOfMachine } from "../../components/PartsOfMachine";
import { MachineScore } from "../../components/MachineScore";
import api from "../services/api";
import { useAuth } from "../../app/context/auth";
import { useMachines } from "../context/machines";

export default function MachineState() {
  const { user } = useAuth();
  const { machineData, resetMachineData, loadMachineData, setScores } =
    useMachineData();
  const { setMachines } = useMachines();

  //Doing this because we're not using central state like redux
  useFocusEffect(
    useCallback(() => {
      loadMachineData();
    }, [])
  );

  const calculateHealth = async () => {
    try {
      const response = await api.post("/machine-health", {
        machines: machineData?.machines,
      });

      if (response.data?.factory) setScores(response.data);
    } catch (error) {
      console.error(error);
      console.log(
        `There was an error calculating health. ${
          error.toString() === "AxiosError: Network Error"
            ? "Is the api running?"
            : error
        }`
      );
    }
  };

  const saveMachineData = async () => {
    try {
      const response = await api.post("/machines", {
        machines: machineData,
        userId: user?.id,
      });

      const { data } = await api.get(`/user/${user.id}/machine-state`);

      setMachines(data);

      Alert.alert("Success", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        <View>
          <Text style={{ width: 75, textAlign: "center" }}>MACHINES</Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
      </View>
      {!machineData && (
        <Link href="/(tabs)/two" style={styles.link}>
          <Text style={styles.linkText}>
            Please log a part to check machine health
          </Text>
        </Link>
      )}
      {machineData && (
        <>
          <PartsOfMachine
            machineName={"Welding Robot"}
            parts={machineData?.machines?.weldingRobot}
          />
          <PartsOfMachine
            machineName={"Assembly Line"}
            parts={machineData?.machines?.assemblyLine}
          />
          <PartsOfMachine
            machineName={"Painting Station"}
            parts={machineData?.machines?.paintingStation}
          />
          <PartsOfMachine
            machineName={"Quality Control Station"}
            parts={machineData?.machines?.qualityControlStation}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
            <View>
              <Text style={{ width: 70, textAlign: "center" }}>SCORES</Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
          </View>
          <Text style={styles.title}>Factory Health Score</Text>
          <Text>
            {machineData?.scores?.factory
              ? machineData?.scores?.factory
              : "Not yet calculated"}
          </Text>
          {machineData?.scores?.machineScores && (
            <>
              <Text style={styles.title2}>Machine Health Scores</Text>
              {Object.keys(machineData?.scores?.machineScores).map((key) => (
                <MachineScore
                  key={key}
                  machineName={key}
                  score={machineData?.scores?.machineScores[key]}
                />
              ))}
            </>
          )}
        </>
      )}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
      </View>
      <Button title="Calculate Health" onPress={calculateHealth} />
      <Button
        title="Save Machine Data"
        color="green"
        onPress={saveMachineData}
      />
      <Button
        title="Reset Machine Data"
        onPress={async () => await resetMachineData()}
        color="#FF0000"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title2: {
    fontSize: 17,
    fontWeight: "bold",
  },
  link: {
    paddingBottom: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
  resetButton: {
    marginTop: 10,
  },
});
