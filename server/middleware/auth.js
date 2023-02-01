const express = require('express');

const auth = async(req,res, next)=>{
    try{


        const token = req.headers.authorization;
        res.json(token);
    }catch(error){
        res.staus(401).json({error: "Authentication Failed..."})

    }
}

module.exports = auth