import { config } from "dotenv";

config();

const database = process.env.DATABASE;
const user = process.env.USER /*DB*/ || "root";

console.log(database);
console.log(user);