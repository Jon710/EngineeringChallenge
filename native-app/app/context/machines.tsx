import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";
import { Alert } from "react-native";

const MachinesContext = createContext([]);

export function MachinesProvider({ children, user }) {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    async function fetchUserMachineData() {
      try {
        const { data } = await api.get(`/user/${user.id}/machine-state`);

        setMachines(data);
      } catch (error) {
        console.log(error);
        Alert.alert("Error loading machine data!");
      }
    }

    fetchUserMachineData();
  }, []);

  return (
    <MachinesContext.Provider value={{ machines, setMachines }}>
      {children}
    </MachinesContext.Provider>
  );
}

export function useMachines() {
  const context = useContext(MachinesContext);

  if (!context) {
    throw new Error("useMachines must be used within a MachinesProvider");
  }

  return context;
}
