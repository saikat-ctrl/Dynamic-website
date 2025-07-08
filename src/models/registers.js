const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Schema
const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    type: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    owner: {
        type: Boolean,
        default: false
    },
    c_date: {
        type: Date,
        default: Date.now
    },
    l_date: {
        type: Date,
        default: Date.now
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});


// Generate JWT Token
// console.log("SECRET_KEY is:", process.env.SECRET_KEY);

registerSchema.methods.generateAuthToken = async function () {
    const user = this;

    const token = jwt.sign(
        { _id: user._id.toString() },
        process.env.SECRET_KEY
    );

    // ✅ Push the new token into the array (allow multiple logins)
    user.tokens = user.tokens.concat({ token });

    await user.save();
    return token;
};

// Hash password before saving
registerSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Model
const Register = mongoose.model('users', registerSchema);
module.exports = Register;
