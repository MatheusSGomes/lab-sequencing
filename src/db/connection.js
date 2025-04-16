import pg from "pg";

export async function connect() {
    const { Pool } = pg;

    const databaseConfig = { connectionString: process.env.CONNECTION_STRING };
    const pool = new Pool(databaseConfig);

    const client = await pool.connect();
    console.log("Pool de conexões criado com sucesso!");

    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
    client.release();

    global.connection = pool;
    return pool.connect();
}

async function createTableTracking() {
    const client = await connect();
    const sql = `
        CREATE TABLE IF NOT EXISTS tracking (
            id SERIAL PRIMARY KEY,
            tracking_id VARCHAR(255) NULL,
            order_id INT NULL,
            freightcarrier_id INT NULL,
            status VARCHAR(50) NOT NULL DEFAULT 'Não atribuído',
            shipping_date TIMESTAMP DEFAULT NOW()
        );
    `;
    const res = await client.query(sql);
    return res.rows;
}

export async function startConnectionDatabase() {
    createTableTracking();
}
