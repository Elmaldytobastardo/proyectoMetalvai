import { createPool } from "mysql2/promise";
import "dotenv/config"

export const pool = createPool({
    host: process.env.HOST_SQL,
    user: process.env.USER,
    password: process.env.PASS,
    port: process.env.PORT_SQL,
    database: process.env.DATABASE,

})

