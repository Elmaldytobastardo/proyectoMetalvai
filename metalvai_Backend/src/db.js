
import pkg from 'pg';
const { Pool } = pkg;
const connectionString = process.env.DATABASE
import "dotenv/config"
    export const pool = new Pool({
        connectionString
    })

   try {
 
   } catch (error) { 
    
   }