const Flow = require('../db/models/flow');

async function flowTendency () {
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
  tenDaysAgo.setHours(0, 0, 0, 0);
  const dailyConsumptionMap = {};
  (await Flow.find({ createdAt: { $gte: tenDaysAgo } })).forEach(consumo => {
    const date = consumo.createdAt.toISOString().substring(0, 10);
    if (!dailyConsumptionMap[date]) {
      dailyConsumptionMap[date] = 0;
    }
    dailyConsumptionMap[date] += consumo.value;
  });

  return {
    dailyConsumption: dates.map(date => dailyConsumptionMap[date]),
    dailyConsumptionMap
  }
}

module.exports = flowTendency;