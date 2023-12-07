import express, { Express } from "express";
import inject from "./src/config/di";
import knex from "knex";
import knexfile from "./src/config/knexfile";

const pg = knex(knexfile.config.pg);

async function assertPGConnection() {
  try {
    return await pg.raw("select 1+1 as result");
  } catch (err) {
    console.log("[Fatal] Failed to establish DB connection! Exiting...");
    console.log(err);
    process.exit(1);
  }
}

// here we could add more middlewares: cors, helmet, logger etc...
function middlewares(server: Express) {
  server.use(express.json());
}

async function createServer() {
  const server = express();
  middlewares(server);
  inject({ server, db: pg });
  const res = await assertPGConnection();
  console.log(res.rows);
  return server;
}

export default createServer();
