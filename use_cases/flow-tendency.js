const Flow = require('../db/models/flow');

async function flowTendency () {
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
  tenDaysAgo.setHours(0, 0, 0, 0);
  const dailyConsumptionMap = {};
  (await Flow.find({ createdAt: { $gte: tenDaysAgo } })).forEach(consumo => {
    const date = consumo.createdAt.toISOString().substring(0, 10);
    if (!dailyConsumptionMap[date]) {
      dailyConsumptionMap[date] = { total: 0, count: 0 };
    }
    dailyConsumptionMap[date].total += consumo.value;
    dailyConsumptionMap[date].count += 1;
  });

  return {
    dailyConsumption: dates.map(date => (dailyConsumptionMap[date].total / dailyConsumptionMap[date].count).toFixed(2)),
    dailyConsumptionMap
  }
}

module.exports = flowTendency;