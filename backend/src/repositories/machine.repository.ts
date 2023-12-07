function Machine({ db }: any) {
  async function saveMachineData(data: any) {
    try {
      const { machines, userId } = data;

      await db.raw(
        `INSERT INTO public.machine_data (user_id, created_at, data) values (:user_id, :created_at, :data)`,
        {
          user_id: userId,
          created_at: new Date(),
          data: JSON.stringify(machines),
        }
      );

      return { message: "Machine data has been saved!", statusCode: 201 };
    } catch (error) {
      console.log(error);
      return { message: "Internal server error", statusCode: 500 };
    }
  }

  async function fetchUserMachineData(userId: any) {
    try {
      const response = await db.raw(
        `SELECT created_at, (data->'scores'->'machineScores') AS machine_scores 
        FROM machine_data 
        WHERE user_id = :user_id AND DATE(created_at) = CURRENT_DATE`,
        { user_id: userId }
      );

      return { data: response.rows, statusCode: 200 };
    } catch (error) {
      console.log(error);
      return { message: "Internal server error", statusCode: 500 };
    }
  }

  return { saveMachineData, fetchUserMachineData };
}

export default Machine;
