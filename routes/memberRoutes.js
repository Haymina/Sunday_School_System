const express = require('express');
const router = express.Router();
const Member = require('../models/member');

router.get("/", (req, res) => {
    res.send("member route working");
});

module.exports = router;

router.post("/register", async (req, res) => {
    try {
        const newMember = new Member(req.body);
        await newMember.save();

        res.json({ message: "Member registered successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/search", async (req, res) => {
    try {
        const { name} = req.query;
        const members = await Member.find({ fullName: { $regex: name, $options: 'i' } });
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: "Error searching members", error });
    }
});

router.get("/status", async (req, res) => {
    try {
        const { status } = req.query;
        const members = await Member.find({ status: status });
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: "Error searching members", error });
    }
});
router.get ("/phone", async ( req, res) => {
    try {
        const{phoneNumber} = req.query;
        const members = await Member.find({ phoneNumber: phoneNumber });
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: "Error searching members by phone number", error });
    }
});

/* Next Step (Day 20)
We will:

Create Admin account
Test login
Use Postman / Thunder Client */