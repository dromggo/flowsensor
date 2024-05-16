const Flow = require('../db/models/flow');

async function flowTendency () {
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
  tenDaysAgo.setHours(0, 0, 0, 0);
  const dailyConsumptionMap = {};
  const hourlyConsumptionMap = new Array(24).fill(0).map(() => ({ total: 0, count: 0 }));

  (await Flow.find({ createdAt: { $gte: tenDaysAgo } })).forEach(consumo => {
    const date = consumo.createdAt.toISOString().substring(0, 10);
    if (!dailyConsumptionMap[date]) {
      dailyConsumptionMap[date] = { total: 0, count: 0 };
    }
    dailyConsumptionMap[date].total += consumo.value;
    dailyConsumptionMap[date].count += 1;

    const hour = consumo.createdAt.getUTCHours();
    hourlyConsumptionMap[hour].total += consumo.value;
    hourlyConsumptionMap[hour].count += 1;
  });

  const dates = Object.keys(dailyConsumptionMap).sort();
  return {
    dailyConsumption: dates.map(date => (dailyConsumptionMap[date].total / dailyConsumptionMap[date].count).toFixed(2)),
    hourlyConsumption: hourlyConsumptionMap.map(hour => (hour.total / hour.count).toFixed(2)),
    dates
  }
}

module.exports = flowTendency;