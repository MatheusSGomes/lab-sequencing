import { connect } from "./connection.js";

export async function getAllTrackings() {
    const client = await connect();
    const res = await client.query('SELECT * FROM tracking;')
    return await res.rows;
}
