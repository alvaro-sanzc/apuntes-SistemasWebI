import { pool } from "./database/19_conexion_postgresql.js";

const getLanguages = async () => {
    try {
        const result = await pool.query("SELECT id, name, developers, enabled FROM language;");
        console.table(result.rows);
        console.log("Languages listed!");
    } catch (error) {
        console.error(error);
    }
};

const addLanguage = async () => {
    try {
        const result = await pool.query("INSERT INTO language (name, developers, enabled) " 
                                    + "VALUES ($1, $2, $3);", ["Dart", 121, false]);
        console.log(result.rowCount);
    } catch (error) {
        console.error(error);
    }
};

getLanguages();
addLanguage();