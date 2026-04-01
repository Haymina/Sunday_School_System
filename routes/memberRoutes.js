const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("member route working");
});

module.exports = router;

router.get("/search", async (req, res) => {
    try {
        const { name} = req.query;
        const members = await Member.find({ fullName: { $regex: name, $options: 'i' } });
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: "Error searching members", error });
    }