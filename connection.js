import pg from "pg";

export async function connect() {
    const { Pool } = pg;

    const databaseConfig = { connectionString: process.env.CONNECTION_STRING };
    const pool = new Pool(databaseConfig);

    const client = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");

    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
    client.release();

    global.connection = pool;
    return pool.connect();
}
