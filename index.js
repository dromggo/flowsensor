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

  app.get('/dashboard', async (req, res) => {
    console.log('dashboard');
    try {
      const usages = actions.lastData();
      res.render('dashboard', { usages });
    } catch (err) {
      res.status(500).send('Error retrieving data');
    }
  });

  app.listen(port, () => {
    console.log(`Flowsensor API listening on port ${port}`);
  })
})