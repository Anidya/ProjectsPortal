const mongoose = require('mongoose');
const uuidv1 = require('uuidv1');
const crypto =  require('crypto');
const Group = require('./group')

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    
    email: {
        type: String,
        trim: true
    },
    
    hashed_password: {
        type: String,
    },
    
    salt: String,

    mentorgroup: [{
        type: mongoose.Schema.ObjectId,
        ref: "Group"
    }],

    supervisorgroup: [{
        type: mongoose.Schema.ObjectId,
        ref: "Group"
    }]
})



teacherSchema.virtual('password')
.set(function(password) {
    this._password = password
    this.salt = uuidv1()
    this.hashed_password=this.encryptPasswordFunction(password)
})
.get(function(){
    return this._password
})



teacherSchema.methods = {
    authenticate: function(plainText)
    {
        return this.encryptPasswordFunction(plainText)==this.hashed_password;
    },

    encryptPasswordFunction: function(password)
    {
        if(!password)
            return "";
        try 
        {
            return crypto.createHmac('sha1',this.salt)
            .update(password)
            .digest('hex');
        }
        catch(err)
        {
            return "";
        }
    }
}



module.exports = mongoose.model("Teacher", teacherSchema);