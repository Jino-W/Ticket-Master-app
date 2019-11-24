const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const employeeSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        // validate:{
        //     validator: function(value){
        //         return validator.isEmail(value)
        //     },
        //     message: function(){
        //         return 'incorrect email format'
        //     }
        // }
    },
    mobile:{
        type:String,
        minlength:10,
        maxlength:10,
        required:true,
        unique:true,
        validate:{
            validator: function(value){
                return validator.isNumeric(value)
            },
            message: function(){
                return 'incorrect mobile number format'
            }
        }
    },
    department:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Department'
    }
})

const Employee = mongoose.model("Employee", employeeSchema)

module.exports = Employee