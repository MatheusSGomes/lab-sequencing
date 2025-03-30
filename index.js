import express from 'express';
import 'dotenv/config'
import { startConnectionDatabase } from './connection.js';

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
    startConnectionDatabase();
    console.log(`Listening on port ${port}`)
})
