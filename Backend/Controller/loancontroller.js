const User = require('../Models/user');
const Loan = require('../Models/loan');
const jwt = require('jsonwebtoken');


function loancontroller() {
    return {
        myLoan: async (req, res) => {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(400).json({ msg: 'Access denied' });
            }
            const userId = jwt.verify(token, 'Thisismysecretkeyforloanapp').userId;

            try {
                let user = await User.findById(userId);
                if (!user) {
                    return res.status(404).json({ msg: 'User not found' });
                }
                const loanIds = user.loans;

                const loans = await Loan.find({ _id: { $in: loanIds } });

                return res.status(200).json({ loans: loans });
            } catch (error) {
                console.log(error);
                return res.status(500).json({ msg: 'Internal Server Error', err: error });
            }
        },

        newloan: async (req, res) => {
            try {
                const token = req.headers.authorization.split(' ')[1];
                if (!token || token==null) {
                    return res.status(400).json({ msg: 'Access denied' });
                }
                const verifiedUser = jwt.verify(token,'Thisismysecretkeyforloanapp');
                const userId = verifiedUser.userId;

                let user = await User.findById(userId);
                if (!user) {
                    return res.status(404).json({ msg: 'User not found' });
                }
                const { loanAmount, term } = req.body;
                let newLoan = new Loan({
                    loanAmount: loanAmount,
                    term: term,
                    installment: [],
                    amountPaid: 0
                });
                newLoan = await newLoan.save();
                user.loans.push(newLoan._id);
                await user.save();
                return res.status(200).json({ msg: 'Loan Applied Successfully' });
            } catch (error) {
                console.log(error);
                return res.status(500).json({ msg: 'Internal Server Error', err: error });
            }
        },

        updatestatus: async (req, res) => {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(400).json({ msg: 'Access denied' });
            }
            const userId = jwt.verify(token, 'Thisismysecretkeyforloanapp');
            // const userId = req.body.userId;

            try {
                let user = await User.findById(userId);
                if (!user) {
                    return res.status(404).json({ msg: 'User not found' });
                } else if (user.role != 'Admin') {
                    return res.status(400).json({ msg: 'Unauthorized User' });
                }
                const { loanId, status } = req.body;
                let loan = await Loan.findById(loanId);

                if (status === 'Deny') {
                    loan.status = 'Denied'
                    await loan.save();
                    return res.status(200).json({ msg: 'Status Updated Successfully' });
                }

                loan.status='Approved';
                const installments = createInstallments(loan);
                loan.installments = installments;
                loan.amountPaid = 0;
                await loan.save();
                return res.status(200).json({ msg: 'Status Updated Successfully' });
            } catch (error) {
                console.log(error);
                return res.status(500).json({ msg: 'Internal Server Error', err: error });
            }
        },

        payInstallment: async (req, res) => {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(400).json({ msg: 'Access denied' });
            }
            const userId = jwt.verify(token, 'Thisismysecretkeyforloanapp').userId;
            // console.log(userId);

            const loanId = req.body.loanId;
            // console.log(req.body.installmentid);
            // return;

            // let user = await User.findById(userId);
            // if (!user) {
            //     return res.status(404).json({ msg: 'User not found' });
            // }
            // if (!user.loans.includes(loanId)) {
            //     return res.status(400).json({ msg: 'Unauthorized User' });
            // }

            let loan = await Loan.findById(loanId);
            const installmentIndex = loan.installments.findIndex(installment => installment.id === (req.body.installmentid+1));

            if (installmentIndex === -1) {
                return res.status(404).json({ error: 'Installment not found' });
            }


            loan.installments[installmentIndex].status = 'Paid';

            await loan.save();

            res.status(200).json({ message: 'Installment status updated to Paid' });
        }
    }
}


function createInstallments(loan) {
    const term = loan.term;
    const amnt = loan.loanAmount;
    const arr = [];

    const startDate = new Date();

    for (let i = 1; i <= term; i++) {
        const dueDate = new Date(startDate);
        dueDate.setDate(startDate.getDate() + i * 7);

        const newInstallment = {
            id: i,
            dueDate: dueDate,
            dueAmount: amnt / term,
            status: 'Due'
        };

        arr.push(newInstallment);
    }
    return arr;
}

module.exports = loancontroller;