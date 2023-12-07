import { format } from "date-fns";

function Machine({ repositories }: { repositories: any }) {
  async function saveMachineData({
    machines,
    userId,
  }: {
    machines: any;
    userId: any;
  }) {
    // TODO: validate user data
    const response = await repositories.machine.saveMachineData({
      machines,
      userId,
    });

    return response;
  }

  async function fetchUserMachineData(userId: any) {
    const response = await repositories.machine.fetchUserMachineData(userId);

    const machineData = response.data.map((data: any) => ({
      ...data,
      formattedDate: format(new Date(data.created_at), "HH:mm"),
    }));

    return machineData;
  }

  return { saveMachineData, fetchUserMachineData };
}

export default Machine;
