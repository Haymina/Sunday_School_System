const mongoose =require('mongoose');

const memberSchema = new mongoose.Schema({
    memberId: { type: String, required: true },
    fullName: { type: String, required: true }, // include grandfather
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    phoneNumber: { type: String, required: false }, // optional
    momsFullName: { type: String, required: true },
    christianityName: { type: String, required: true },
    emergencyContact: {
        name: { type: String, required: true },
        phone: { type: String, required: true }
    },
    fatherOfRepentance: {
        name: { type: String, required: true },
        phone: { type: String, required: true }
    },
    memberType: { type: String, required: true },
    registrationDate: { type: Date, required: true },
    membershipRegistrationDate: { type: Date, required: true },
    memberLevel: { type: String, required: true },
    jobType: { type: String, required: true },
    maternityStatus: { type: String, required: true },
    address: { type: String, required: true },
    photo: { type: String, required: false }, // you can save a file path or URL
    status: { type: String, required: true } 
});
const Member = mongoose.model('Member', memberSchema);
module.exports = Member;