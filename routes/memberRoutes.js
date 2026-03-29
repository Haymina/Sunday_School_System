const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("member route working");
});

module.exports = router;
