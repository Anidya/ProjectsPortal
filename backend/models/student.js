const mongoose = require('mongoose');
const uuidv1 = require('uuidv1');
const crypto =  require('crypto');
const Group = require('./group')

const studentSchema = new mongoose.Schema({
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

    group: {
        type: mongoose.Schema.ObjectId,
        ref: "Group"
    }
})



studentSchema.virtual('password')
.set(function(password) {
    this._password = password
    this.salt = uuidv1()
    this.hashed_password=this.encryptPasswordFunction(password)
})
.get(function(){
    return this._password
})



studentSchema.methods = {
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



module.exports = mongoose.model("Student", studentSchema);