import { connect } from "./connection.js";

export async function getAllTrackings() {
    const client = await connect();
    const res = await client.query('SELECT * FROM tracking;')
    return res.rows;
}

export async function getTrackingByOrder(order_id) {
    const client = await connect();
    const sql = 'SELECT * FROM tracking WHERE order_id = $1;';
    const res = await client.query(sql, [order_id]);
    return res.rows;
}

export async function initTracking(order_id, freightcarrier_id) {
    const client = await connect();
    const sql = 'INSERT INTO tracking(order_id, freightcarrier_id) VALUES($1, $2)';
    const values = [order_id, freightcarrier_id];
    return await client.query(sql, values);
}
