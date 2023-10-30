const mongoose = require('mongoose');
const loanSchema = mongoose.Schema({
    loanAmount: {
        type: Number,
        required: true,
    },
    term: {
        type: Number,
        required: true
    },
    appliedDate: {
        type: Date,
        default: Date.now()
    },
    status:{
        type: String,
        default: 'Pending',
        enum: ['Approved','Pending','Denied'],
    },
    installments:[{
        id:{
            type: Number,
            required: true
        },
        dueDate:{
            type: Date,
            required: true
        },
        dueAmount:{
            type: Number,
            required: true
        },
        status:{
            type: String,
            default: 'Due',
            enum: ['Due','Paid'],
        }
    }],
    amountPaid:{
        type: Number,
        required: true
    },
    completionStatus:{
        type: String,
        default: 'Due',
        enum: ['Due','Completed']
    }
}, { timeStamps: true });

const Loan = mongoose.model('Loan',loanSchema);
module.exports = Loan;