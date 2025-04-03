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
    // Adicionar WHERE tracking_id is not null AND status = 'Não atribuido'
    const sql = 'INSERT INTO tracking(order_id, freightcarrier_id) VALUES($1, $2)';
    const values = [order_id, freightcarrier_id];
    return await client.query(sql, values);
}

export async function getNumberOfTrackingsUnassigned() {
    const client = await connect();
    const sql = 'SELECT count(1) FROM tracking WHERE tracking_id IS NOT NULL AND status = $1';
    const values = ['Não atribuído'];
    return await client.query(sql, values);
}

export async function generateTracking(tracking_id) {
    const client = await connect();
    const sql = 'INSERT INTO tracking(tracking_id) VALUES($1)';
    const values = [tracking_id];
    return await client.query(sql, values);
}

export async function updateStatusTracking(new_status, tracking_id) {
    const client = await connect();
    const shipping_date = new Date();
    const sql = 'UPDATE tracking SET status = $1, shipping_date = $2 WHERE tracking_id = $3;';
    const values = [new_status, shipping_date, tracking_id]
    return await client.query(sql, values);
}
