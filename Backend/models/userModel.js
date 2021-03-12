const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    passwordHash: {
        type: String, 
        required: true, 
        minlength: 6
    }
})

const User = mongoose.model("user", UserSchema);
module.exports = User;