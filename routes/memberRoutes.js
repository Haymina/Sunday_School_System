const express = require('express');
const router = express.Router();
const Member = require('../models/member');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Protect All Routes
router.use(auth);


// Test Route
router.get("/", (req, res) => {
    res.send("member route working");
});

router.get("/", auth, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const filter = {};
        if (req.query.jobType) {
            filter.jobType = req.query.jobType;
        }
        if (req.query.status) {
            filter.status = req.query.status;
        }
        if (req.query.memberLevel) {
            filter.memberLevel = req.query.memberLevel;
        }

        const members = await Member.find(filter).skip(skip).limit(limit);
        res.json(members);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Register Member
router.post("/register", async (req, res) => {
    try {
        const newMember = new Member(req.body);
        await newMember.save();

        res.json({ message: "Member registered successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Search by Name, memberLevel, phoneNumber, and status
router.get("/search", auth, async (req, res) => {
    try {
        const { name, memberLevel, phoneNumber, status } = req.query;

        let searchQuery = {};

        if (name) {
            searchQuery.fullName = { $regex: name, $options: "i" };
        }

        if (memberLevel) {
            searchQuery.memberLevel = memberLevel;
        }

        if (phoneNumber) {
            searchQuery.phoneNumber = phoneNumber;
        }
        if (status) {
            searchQuery.status = status;
        }       

        const members = await Member.find(searchQuery);

        res.json(members);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Approve Member
router.put('/approve/:id', admin , async (req, res) => {
    try {
        const member = await Member.findByIdAndUpdate(
            req.params.id,
            { status: 'approved' },
            { new: true }
        );

        if (!member) {
            return res.status(404).json({
                message: "Member not found"
            });
        }

        res.json({
            message: 'Member approved successfully',
            member
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error approving member',
            error
        });
    }
});


// Reject Member
router.put('/reject/:id', admin, async (req, res) => {
    try {
        const member = await Member.findByIdAndUpdate(
            req.params.id,
            { status: 'rejected' },
            { new: true }
        );

        res.json({
            message: 'Member rejected successfully',
            member
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error rejecting member',
            error
        });
    }
});


// Update Member
router.put('/update/:id', admin, async (req, res) => {
    try {
        const member = await Member.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!member) {
            return res.status(404).json({
                message: "Member not found"
            });
        }

        res.json({
            message: 'Member updated successfully',
            member
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error updating member',
            error
        });
    }
});


// Delete Member
router.delete('/delete/:id', admin, async (req, res) => {
    try {
        const member = await Member.findByIdAndDelete(
            req.params.id
        );

        if (!member) {
            return res.status(404).json({
                message: "Member not found"
            });
        }

        res.json({
            message: 'Member deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error deleting member',
            error
        });
    }
});


// View Member
router.get('/view/:id', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
            return res.status(403).json({ message: "Access denied" });
        }

        const member = await Member.findById(req.params.id);
        if (!member) return res.status(404).json({ message: "Member not found" });

        res.json(member);

    } catch (error) {
        res.status(500).json({ message: "Error fetching member", error });
    }
});


module.exports = router;