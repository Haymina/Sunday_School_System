const express = require("express");
const connectDB = require("./config/db");
const Member = require("./models/member");
const memberRoutes = require("./routes/memberRoutes");

// Connect to DB
connectDB();

// Create Express app
const app = express();
app.use(express.json());

// Use member routes
app.use("/members", memberRoutes);

// Example: insert one member (temporary, later move to route)
const newMember = new Member({ /* member data */ });
newMember.save()
    .then(() => console.log("Member saved successfully"))
    .catch(err => console.log(err));

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});