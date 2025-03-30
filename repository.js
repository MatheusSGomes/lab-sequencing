import { connect } from "./connection.js";

export async function getAllTrackings() {
    const client = await connect();
    const res = await client.query('SELECT * FROM tracking;')
    console.log(res);
    return await res.rows;
}
