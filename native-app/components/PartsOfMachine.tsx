import React from "react";
import { StyleSheet, Text } from "react-native";

export const PartsOfMachine = ({
  machineName,
  parts,
}: {
  machineName: string;
  parts: Record<string, string>;
}) => {
  return (
    <>
      {parts && (
        <>
          <Text style={styles.title}>{machineName}</Text>
          {Object.keys(parts).map((key) => (
            <Text key={key}>
              {key}: {parts[key]}
            </Text>
          ))}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "bold" },
});
