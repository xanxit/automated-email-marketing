const mongoose = require("mongoose");

const cronModel = new mongoose.Schema({
  second: {
    type: Number,
  },
  minute: {
    type: Number,
  },
  hour: {
    type: Number,
  },
  dom: {
    type: Number,
  },
  month: {
    type: Number,
  },
  dow: {
    type: Number,
  },
});

const Cronie = mongoose.model("Cronie", cronModel);

module.exports = Cronie;
