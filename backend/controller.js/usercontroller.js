const ErrorHandler = require("../Errorhandler");
const catchAsyncErrors = require("../asynchandler")
const sendToken = require('../jwttoken');
const User = require("../model");
const jwt = require('jsonwebtoken');



//SignUP
exports.registeruser = catchAsyncErrors(async (req, res, next) => {
    const { email, password, username } = req.body;

    try {
        const existingmail = await User.findOne({ email });

        if (existingmail) {
            return next(new ErrorHandler("Please Enter Email and Password", 400));
        }
        const user = await User.create({
            email, password,
            username,
            balance: 0,
            income: 0,
            expense: 0,
            transactions: [],
        });
        sendToken(user, 201, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//LOGOUT
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({ success: true });
});

//Login
exports.loginuser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return next(new ErrorHandler("Invlid Email and Password ", 401))
        }
        sendToken(user, 200, res);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




//GET USER INFO
exports.getuserinfo = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



//ADD a transaction
exports.addtransaction = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { title, amount, transactionType } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const transaction = {
            title: title,
            amount: amount,
            type: transactionType,
        };

        user.transactions.push(transaction);

        if (transactionType === 'income') {
            user.income += amount;
            user.balance += amount;
        } else {
            user.expense += amount;
            user.balance -= amount;
        }

        await user.save();

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Deleting a transaction
exports.deletetransaction = catchAsyncErrors(async (req, res, next) => {
    const { id, transactionId } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }


        const transactionIndex = user.transactions.findIndex(t => t._id.toString() === transactionId);

        if (transactionIndex === -1) {
            return res.status(404).json({ error: 'Transaction not found' });
        }


        const deletedTransaction = user.transactions[transactionIndex];


        user.transactions.splice(transactionIndex, 1);

        if (deletedTransaction.type === 'income') {
            user.income -= deletedTransaction.amount;
            user.balance -= deletedTransaction.amount;
        } else {
            user.expense -= deletedTransaction.amount;
            user.balance += deletedTransaction.amount;
        }

        await user.save();

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


exports.isauthenticateduser = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedData.id);
        next();
    } catch (error) {
        // Token is invalid or expired
        return next(new ErrorHandler("Invalid or expired token", 401));
    }
})