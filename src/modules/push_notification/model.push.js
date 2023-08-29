const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reminderSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    datetime: {
      type: Date,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ReminderModel = mongoose.model("Reminder", reminderSchema);

module.exports = ReminderModel;
