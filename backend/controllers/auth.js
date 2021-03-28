const Teacher = require('../models/teacher')
const Student = require('../models/student')
const jwt = require('jsonwebtoken')
require('dotenv').config()


exports.teachersignup = async (req,res) => {
    const userExists = await Teacher.findOne({email: req.body.email})
    if(userExists)
        return res.status(403).json({error: "User with the email already registered"});
    
    const user = await new Teacher(req.body)
    await user.save();
    res.status(200).json("Signup Successful please login");
}

exports.teachersignin = (req,res) => {
    const {email, password} = req.body
    Teacher.findOne({email}, (err,user)=>{
        if(err || !user)
            return res.status(401).json({error: "User with that email doesnot exist."})
    
        if(!user.authenticate(password))
            return res.status(401).json({error: "Email and password do not match"});


        const token = jwt.sign({_id: user._id},process.env.JWT_SECRET);
        res.cookie("t",token,{expire: new Date()+9999})
        const {_id,name,email} = user
        return res.json({token,user: {_id,name,email}}); 
   })
}




exports.studentsignup = async (req,res) => {
    const userExists = await Student.findOne({email: req.body.email})
    if(userExists)
        return res.status(403).json({error: "User with the email already registered"});
    
    const user = await new Student(req.body)
    await user.save();
    res.status(200).json("Signup Successful please login");
}

exports.studentsignin = (req,res) => {
    const {email, password} = req.body
    Student.findOne({email}, (err,user)=>{
        if(err || !user)
            return res.status(401).json({error: "User with that email doesnot exist."})
    
        if(!user.authenticate(password))
            return res.status(401).json({error: "Email and password do not match"});


        const token = jwt.sign({_id: user._id},process.env.JWT_SECRET);
        res.cookie("t",token,{expire: new Date()+9999})
        const {_id,name,email,group} = user
        return res.json({token,user: {_id,name,email,group}}); 
   })
}




exports.signout = (req,res) => {
    res.clearCookie("t");
    return res.json({message: "User is Signed Out!"});
}