const mongoose = require('mongoose');

function db() {
  let instance;

  async function createInstance() {
    return true;
    console.log('Connecting to db...');
    let db = await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected');
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