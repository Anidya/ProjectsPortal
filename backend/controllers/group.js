const Group = require('../models/group');
const Teacher = require('../models/teacher');
const Student = require('../models/student');
const lodash = require('lodash');

exports.groupById = (req,res,next,id) => {
    Group.findById(id)
    .exec((err,group) => {
        if(err || !group)
            return res.status(400).json({"Error": "Group not found"})
        req.groupDetails = group;
        next();
    })
}

exports.getGroups = (req,res) => {
    Group.find( (err,groups)=>{
        if(err)
            return res.status(400).json({error: err});  
        res.json(groups)
    });
}

exports.getOneGroup = (req,res) => {
    //console.log(req.groupDetails);
    return res.json(req.groupDetails);
}

exports.createGroup = (req,res) => {

    const {id, mentor, students, supervisors} = req.body;
    const group = new Group(req.body);
    group.save()
    .then( result => {

        // Teacher.findOneAndUpdate(
        //     {email: mentor.email}, 
        //     {$push: {'mentorgroup': group._id}}, 
        //     {new: true})
        // .then(result);

        // for(var i=0; i<supervisors.length; i++){
        //     if(supervisors[i]){
        //         Teacher.findOneAndUpdate(
        //             {email: supervisors[i].email}, 
        //             {$push: {'supervisorgroup': group._id}}, 
        //             {new: true})
        //         .then(result);
        //     }
        // }
        
        for(var i=0; i<students.length; i++){
            if(students[i]){
                Student.update(
                    {email: students[i].email}, 
                    {$set: {'group': group._id}}, 
                    {new: true})
                .then(result);
            }
        }

        res.json( {group: result})
    });
}

exports.updateGroup = (req,res) => {
    var group = req.groupDetails;
    group = lodash.extend(group, req.body);
    group.save( (err) => {
        if(err)
            return res.status(400).json({error: err});
        res.json(group);
    });

}