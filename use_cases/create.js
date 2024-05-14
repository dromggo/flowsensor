const Flow = require('../db/models/flow');

async function createFlow(payload) {
  const flow = new Flow({
    value: payload.value,
    deviceId: payload.deviceId
  })

  return await flow.save();
}

module.exports = createFlow;