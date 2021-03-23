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
        description: {type: String}
    },

    deadlines: {
        title: {type: Boolean},
        description: {type: Boolean}
    }

});


module.exports = mongoose.model("Group", groupSchema);