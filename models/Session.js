const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 1
    },
    img: {
        type: String,
        required: true,
        min: 1
    },
    startDate: {
        type: String,
        required: true,
        min: 1
    },
    startTime: {
        type: String,
        required: true,
        min: 1
    },
    endDate: {
        type: String,
        required: true,
        min: 1
    },
    endTime: {
        type: String,
        required: true,
        min: 1
    },
    maxStudents: {
        type: Number,
        required: true,
        min: 1
    },
    subject: {
        type: String,
        required: true,
        min: 1
    },
    currStudents: [{
        type: String,
        required:true,
        min: 0
    }],
    status:{
       type: String,
       required: true,
       min:0
    }
});

module.exports = mongoose.model('Session', SessionSchema);