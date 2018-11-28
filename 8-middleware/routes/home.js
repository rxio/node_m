const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hi, welcome to the homepage.");
});

module.exports = router;