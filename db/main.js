const mongoose = require('mongoose');

function db() {
  let instance;

  async function createInstance() {
    console.log('Connecting to db...');
    console.log(process.env.MONGO_URL);
    let db = await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected', db);
    return db;
  }

  return {
    buildInstance: function() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
}

module.exports = db();