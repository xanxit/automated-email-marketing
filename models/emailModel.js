const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    to: {
      type: [String],
      required: true,
    },
    cc: {
      type: [String],
      required: true,
    },
    subject: {
      type: String,
    },
    mailBody: {
      type: String,
    },

    minutes: {
      type: Number,
      required: true,
    },
    hours: {
      type: Number,
      required: true,
    },
    date: {

      type: Number,
      required: true,
    },
    month: {
      type: Number,

      required: true,
    },
    scheduled: {
      type: Number,
    },
  }, 
  {
    timestamps: true,
  }
);

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
