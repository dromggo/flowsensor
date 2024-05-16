const Flow = require('../db/models/flow');

async function lastData(payload) {
  let usages = await Flow.find().sort({ createdAt: -1 }).limit(20);
  usages.map((u) => {
        u.createdAt = u.createdAt.toISOString().substring(0, 10) + ' ' + u.createdAt.toISOString().substring(11, 19)
      })
  return usages;
}

module.exports = lastData;