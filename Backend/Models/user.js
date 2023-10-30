const mongoose = require('mongoose');
const Loan = require('./loan');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    loans: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Loan'
    }],
    role: {
        type: String,
        default: 'Customer'
    }
}, { timeStamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;