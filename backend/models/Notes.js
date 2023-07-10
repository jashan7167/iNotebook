const mongoose = require('mongoose')
const {Schema} = mongoose;


const noteSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        required:true
    }
})

module.exports = mongoose.model('note',noteSchema)

