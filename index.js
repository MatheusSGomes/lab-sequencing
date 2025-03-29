const express = require('express');
require("dotenv").config();

const app = express()
const port = 3000

console.log(process.env.CONNECTION_STRING);

// bootstrap
// const sql = `
//   CREATE TABLE rastreamento (
//       id SERIAL PRIMARY KEY, -- Também poderia usar DEFAULT nextval('tracking_id_seq')
//       tracking_id INT NOT NULL DEFAULT nextval('tracking_id_seq'),
//       pedido_id INT NULL,
//       transportadora_id INT NULL,
//       status VARCHAR(50) NOT NULL DEFAULT 'Em trânsito',
//       data_envio TIMESTAMP DEFAULT NOW()
//   );
// `;

// await db.any(sql);

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// {
//   "dependencies": {
//     "dotenv": "^16.4.7",
//     "express": "^4.21.2",
//     "pg": "^8.14.1"
//   }
// }

