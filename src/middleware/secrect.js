const jwt = require("jsonwebtoken");
const Register = require("../models/registers");
const secrect = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(`verifyUser is: ${verifyUser}`);
        const user = await Register.findOne({ _id: verifyUser._id });
        console.log(`user is: ${user.type}`);
        next();
        
        // const user = await Register.findOne({ _id: verifyUser._id });
        // if (user) {
        //     req.token = token;
        //     req.user = user;
        //     next();
        // }
    } catch (error) {
        res.status(401).send(error);
    }
};
module.exports = secrect;