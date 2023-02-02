const pool = require("../database/conn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ENV = require("../config.js");

const generateOTP = async (req, res) => {};

const verifyOTP = async (req, res) => {};

module.exports = { generateOTP, verifyOTP };
