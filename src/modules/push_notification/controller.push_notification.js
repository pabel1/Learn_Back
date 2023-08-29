const catchAsyncError = require("../../Middleware/catchAsyncError");
const Errorhandeler = require("../../utility/ErrorHandler");
const ReminderModel = require("./model.push");
const { createRemainderToDB } = require("./services.push");

exports.remainderCreate = catchAsyncError(async (req, res, next) => {
  const { title, datetime, userId } = req.body;

  const { status, remainder } = await createRemainderToDB(
    req,
    title,
    datetime,
    userId
  );

  res.status(201).json({
    success: true,
    message: "remainder Created Successfully!!",
    remainder,
  });
});
