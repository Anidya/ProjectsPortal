const mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
    id: {
        type: String,
        trim: true
    },
    
    mentor: {
        name: {type: String},
        email: {type: String}
    },
    
    students: [{
        name: {type: String},
        email: {type: String}
    }],
    
    supervisors: [{
        name:  {type: String},
        email: {type: String}
    }],


    fields: { 
        title: {type: String},
        description: {type: String},
        tech: {type: String},
        report: {
            data: Buffer,
            contentType: String
        },
        synopsis: {
            data: Buffer,
            contentType: String
        },
    },

    deadlines: {
        title: {type: String},
        description: {type: String},
        tech: {type: String},
        report: {type: String},
        synopsis: {type: String}
    }
});


module.exports = mongoose.model("Group", groupSchema);