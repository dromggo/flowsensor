const Flow = require('../db/models/flow');

async function latest() {
  return await Flow.find().sort({ createdAt: -1 }).limit(50);
}

module.exports = latest;