const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    }
});

// Before savong the password we have called this pre method
// This is also acting as the middle ware 
// We are hashing the paasword

userSchema.pre('save', async function (next) {
    try {

        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 12);
            this.cpassword = await bcrypt.hash(this.cpassword, 12);
        }
        next();
    } catch (err) {
        console.log(err);
    }
});
const User = mongoose.model('USER', userSchema);
module.exports = User;