const { Router } = require('express');
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const user = require('../models/User');
const { body, validationResult} = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtsecret = "MynameisEndtoEndYouChannel$#"

// creatuser side 

router.post("/creatuser",[
    body('email', 'Incorrect Email').isEmail(),
    body.apply('name').isLength({ min:5 }),                                                                                                                                                                                                         
    body('password','Incorrect Password').isLength({ min:5 })
]
,async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt)

    try {
      await  User.create({
            name:req.body.name,
            password:secPassword,
            email:req.body.email,
            location:req.body.location
        }).then(  res.json({sucess:true}));

    } catch (error) {
        console.log(error)
        res.json({sucess:false});
    }
})

// This is a login side

router.post("/loginuser",[
    body('email', 'Incorrect Email').isEmail(),
    body('password','Incorrect Password').isLength({min:5})
], async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() });
    }

    let email = req.body.email;

    try {
     let userData = await  User.findOne({email})
     if(!userData){
         return res.status(400).json({error: "Try logging with correct credential" })
    }

    const pwdClompare = await bcrypt.compare(req.body.password, userData.password)
    if(!pwdClompare){
        return res.status(400).json({error: "Try logging with correct credential" })
    }

    const data = {
        user:{
            id:userData.id
        }
    }
    const authToken = jwt.sign(data, jwtsecret)
    return res.json({success:true, authToken:authToken})
    } catch (error) {
        console.log(error)
        res.json({sucess:false});
    }
})

module.exports = router;