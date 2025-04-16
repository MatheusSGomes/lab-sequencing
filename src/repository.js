import { connect } from "./db/connection.js";
import { v4 as uuidv4 } from 'uuid';

export async function getAllTrackings() {
    const client = await connect();
    const res = await client.query('SELECT * FROM tracking;')
    return res.rows;
}

export async function getAvailableTrackings() {
    const client = await connect();
    const res = await client.query('SELECT * FROM tracking WHERE order_id IS NOT NULL AND freightcarrier_id IS NOT NULL;')
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
    const sql = 'UPDATE tracking SET order_id = $1, freightcarrier_id = $2 WHERE tracking_id IS NOT NULL AND order_id IS NULL AND freightcarrier_id IS NULL AND status = $3;';
    const values = [order_id, freightcarrier_id, 'Não atribuído'];
    return await client.query(sql, values);
}

export async function getNumberOfTrackingsUnassigned() {
    const client = await connect();
    const sql = 'SELECT count(1) FROM tracking WHERE tracking_id IS NOT NULL AND order_id IS NULL AND freightcarrier_id IS NULL AND status = $1';
    const values = ['Não atribuído'];
    return await client.query(sql, values);
}

export async function generateTrackings(number_of) {
    const client = await connect();

    try {
        await client.query('BEGIN');
        for (let index = 0; index < number_of; index++) {
            const tracking_id = uuidv4();
            const sql = 'INSERT INTO tracking(tracking_id, status) VALUES($1, $2)';
            const values = [tracking_id, 'Não atribuído'];
            await client.query(sql, values);
        }
        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        console.log(error);
    } finally {
        client.release();
    }
}

export async function updateStatusTracking(new_status, tracking_id) {
    const client = await connect();
    const shipping_date = new Date();
    const sql = 'UPDATE tracking SET status = $1, shipping_date = $2 WHERE tracking_id = $3;';
    const values = [new_status, shipping_date, tracking_id]
    return await client.query(sql, values);
}
