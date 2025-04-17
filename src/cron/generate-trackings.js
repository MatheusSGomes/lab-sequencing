import fetch from 'node-fetch';

const URL = 'http://localhost:3000/tracking/generate';
const INTERVAL_MINUTES = 1;

async function callGenerateRoute() {
  try {
    const res = await fetch(URL, { method: 'POST', headers: {'Content-Type': 'application/json'} });
    const data = await res.json();
    console.log(`[${new Date().toISOString()}] Tracking:`, data.message);
  } catch (err) {
    console.log(err)
    console.error(`[${new Date().toISOString()}] Erro ao chamar rota:`, err.message);
  }
}

callGenerateRoute();
setInterval(callGenerateRoute, INTERVAL_MINUTES * 60 * 1000); // Executa a cada 5 minutos
