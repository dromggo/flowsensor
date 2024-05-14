require('dotenv').config()
const actions = require('./use_cases/main');
const app = require('./server');
const db = require('./db/main');

const port = 3000

db.buildInstance().then(() => {
  app.post('/flow', async (req, res) => {
    await actions.create(req.body);
    res.send('Flow created');
  })

  app.get('/usage', async (req, res) => {
    try {
      const registros = await actions.lastData()
      res.json(registros);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.listen(port, () => {
    console.log(`Flowsensor API listening on port ${port}`);
  })
})