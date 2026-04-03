const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');

const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {

    const token = jwt.sign(
      { role: "admin" },
      "secretkey",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token: token
    });

  } else {
    res.status(401).json({
      message: "Invalid credentials"
    });
  }
});
module.exports = router;