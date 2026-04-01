const express = require("express");
const connectDB = require("./config/db");

const memberRoutes = require("./routes/memberRoutes");
const adminRoutes = require("./routes/adminRoutes");

connectDB();

const app = express();
app.use(express.json());

app.use("/members", memberRoutes);
app.use("/admin", adminRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});