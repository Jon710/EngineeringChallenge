// obviously, these should be pulled from environment variables or config file instead of hard-coded
const config = {
  pg: {
    client: "postgresql",
    connection: {
      host: "localhost",
      password: "postgres",
      database: "bellsant",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};

export default { config };
