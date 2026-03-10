const connectDB = require("./config/db"); // adjust the path if your file is elsewhere
const Member = require("./models/member");
const mongoose = require('mongoose');

// Call it
connectDB();

const http = require("http");

const server = http.createServer((req, res) => {
  res.write("Server is running");
  res.end();
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});


// Example of inserting one member
const newMember = new Member({
    memberId: "M001",
    fullName: "Abel Tesfaye Yohannes",
    dateOfBirth: new Date("2010-05-20"),
    gender: "Male",
    phoneNumber: "0912345678",
    momsFullName: "Selamawit Bekele",
    christianityName: "Abel",
    emergencyContact: { name: "Dawit", phone: "0911223344" },
    fatherOfRepentance: { name: "Ephrem", phone: "0911334455" },
    memberType: "Regular",
    registrationDate: new Date(),
    membershipRegistrationDate: new Date(),
    memberLevel: "Beginner",
    jobType: "Student",
    maternityStatus: "N/A",
    address: "Addis Ababa",
    photo: "path/to/photo.jpg",
    status: "Active"
});

newMember.save()
    .then(() => console.log("Member saved successfully"))
    .catch(err => console.log(err));

async function getAllMembers() {
  const members = await Member.find();
  console.log(members);
};