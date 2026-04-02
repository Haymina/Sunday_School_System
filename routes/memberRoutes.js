const express = require('express');
const router = express.Router();
const Member = require('../models/member');

router.get("/", (req, res) => {
    res.send("member route working");
});



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

router.put('/approve/:id', async (req, res) => {
    try {
        const member = await Member.findByIdAndUpdate(
            req.params.id, 
            { status: 'approved' }, 
            { new: true }
        );
        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }
        res.json({ message: 'Member approved successfully', member });

    } catch (error) {
        res.status(500).json({ message: 'Error approving member', error });
    }
});

router.put('/reject/:id', async (req, res) => {
    try {
        const member = await Member.findByIdAndUpdate(
            req.params.id, 
            { status: 'rejected' }, 
            { new: true }
        );
        res.json({ message: 'Member rejected successfully', member });
    } catch (error) {
        res.status(500).json({ message: 'Error rejecting member', error });
    }   
});

router.put('/update/:id', async (req, res) => {
    try {
        const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }
        res.json({ message: 'Member updated successfully', member });
    }   
    catch (error) {
        res.status(500).json({ message: 'Error updating member', error });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const member = await Member.findByIdAndDelete(req.params.id);
        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }
        res.json({ message: 'Member deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting member', error });
    }
});

router.get('/view/:id', async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);    
        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }
        res.json(member);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching member', error });
    }
}); 

module.exports = router;

/* Next Step (Day 20)
We will:

Create Admin account
Test login
Use Postman / Thunder Client */