const express = require('express');
const router = express.Router();
const Admin = require('../models/admin')

router.post('/login', async(req, res) => {
 try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }
    if (password !== admin.password) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }
    res.json({ message: 'Login successful', admin });
    
   }catch(error){
      res.status(500).json({error: error.message})
   }
});

module.exports = router;