const mongo = require('mongoose');

const task = mongo.Schema({
    tid: { type: Number, require: true, },
    taskname: { type :String, require: true},
    desc: { type : String, require: true },
    sdata: { type: String},
    ldata: { type: String},
    assignemp: {type: String}
})

module.exports = mongo.model('task',task);
