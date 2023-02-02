const pool = require("../database/conn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ENV = require("../config.js");
const otpGenerator = require('otp-generator');

const generateOTP = async (req, res) => {
    req.app.locals.OTP = await otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
    res.status(201).send({code: req.app.locals.OTP})
};

const verifyOTP = async (req, res) => {
    const {code} = req.query;
    if(parseInt(req.app.locals.OTP)=== parseInt(code)){
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true;
        return res.status(201).send({msg:' Verified Succesfully..'})
    }
    else{
        return res.status(404).send({error:'Invalid OTP'})
    }
};

module.exports = { generateOTP, verifyOTP };
