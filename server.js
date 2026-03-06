const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/sundayschoolDB")
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch((err) => {
    console.log("MongoDB connection error:", err);
});

app.get("/", (req, res) => {
    res.send("Sunday School System API is running");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});