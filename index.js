import express from 'express';
import 'dotenv/config'
import { startConnectionDatabase } from './connection.js';

const app = express()
const port = 3000

startConnectionDatabase();

// await db.any(sql);

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
