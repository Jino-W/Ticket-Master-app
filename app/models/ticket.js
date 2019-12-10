const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ticketSchema = new Schema({
    customer:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    department:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Department'
    },
    // employee:{
    //     type: [Schema.Types.ObjectId],
    //     required: true,
    //     ref: 'Employee'
    // },
    priority:{
        type:String,
        required:true,
        enum: ['High', 'Medium', 'Low']
    },
    title:{
        type:String,
        minlength:5,
        maxlength:80,
        required:true
    },
    message:{
        type:String,
        minlength:5,
        maxlength:150
    },
    isResolved:{
        type:Boolean,
        default:false
    },
    code:{
        type:String,
        required:true
    }
})

const Ticket = mongoose.model("Ticket", ticketSchema)

module.exports = Ticket