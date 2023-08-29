const ReminderModel = require("./model.push");

exports.createRemainderToDB = async (req, title, datetime, userId) => {
  try {
    const newReminder = new ReminderModel({ title, datetime, userId });
    const remainder = newReminder.save();

    return { status: true, remainder };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};
