const express = require("express");
const { remainderCreate } = require("./controller.push_notification");

// internal import

// creating router
const router = express.Router();

router.route("/create-remainder").post(remainderCreate);

module.exports = router;
