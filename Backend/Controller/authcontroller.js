const User = require('../Models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function authcontroller() {
    return {
        register: async (req, res) => {
            const { userName, email, password } = req.body;
            try {
                const user = await User.findOne({ email: email });
                if (user) {
                    return res.status(400).json({ msg: 'User with email already registered' });
                }

                const hashPassword = await bcrypt.hash(password, 12);

                let newUser = new User({
                    userName: userName,
                    email: email,
                    password: hashPassword
                });

                newUser = await newUser.save();

                const tokenAge = 86400000;
                const token = generateAuthToken(newUser._id);

                // res.cookie('token', token, {
                //     httpOnly: true,
                //     domain: 'http://localhost:3000',
                // },{ maxAge: tokenAge });

                return res.status(200).json({ msg: 'Registration Successfull', token: token });
            } catch (error) {
                console.log(error);
                return res.status(500).json({ msg: 'Internal Server Error', err: error });
            }
        },

        login: async (req, res) => {
            const { email, password } = req.body;
            try {
                const user = await User.findOne({ email: email });
                if (!user) {
                    return res.status(404).json({ message: 'Invalid Email or Password' });
                }

                const passCheck = await bcrypt.compare(password, user.password);
                if (!passCheck) {
                    return res.status(404).json({ message: 'Invalid Email or Password' });
                }

                const tokenAge = 86400000;
                const token = generateAuthToken(user._id);
                res.cookie('token', token, {
                    httpOnly: true,
                    domain: 'http://localhost:3000',
                },{ maxAge: tokenAge });
                // res.cookie('token', token, { maxAge: tokenAge });
                return res.status(200).json({ msg: 'Login Successfull', token: token });
            } catch (error) {
                console.log(error);
                return res.status(500).json({ msg: 'Internal Server Error', err: error });
            }
        },

        logout: (req, res) => {
            res.clearCookie('token');
            return res.status(200).json({ msg: 'Logout Successfully' });
        },
    }
}

function generateAuthToken(userId) {
    const tokenAge = 86400000; // 24 Hrs
    return jwt.sign({ userId: userId }, 'Thisismysecretkeyforloanapp', { expiresIn: tokenAge });
}

module.exports = authcontroller;