import app from "./app";

const PORT = 3333;

app
  .then((a) => {
    a.listen(PORT, () =>
      console.log(`API running at http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.error(`Failed to start server: ${error.stack}`));
