const Flow = require('../db/models/flow');

async function lastData(payload) {
  return await Flow.find().sort({ createdAt: -1 }).limit(20);
}

module.exports = lastData;