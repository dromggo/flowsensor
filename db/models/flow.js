const mongoose = require('mongoose');

const FlowSchema = new mongoose.Schema({
  value: Number,
  deviceId: String
}, { timestamps: true });

module.exports = mongoose.model('Flow', FlowSchema);