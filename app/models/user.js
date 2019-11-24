const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type: String,
        required: 'Username is mandatory',
        unique: true,
        minlength: 5
    },
    email:{
        type: String,
        unique: true,
        validate:{
            validator: function(value){
                return validator.isEmail(value)
            },
            message: function(){
                return 'Invalid email fomat'
            }
        }
    },
    mobile:{
        type: String,
        unique: true,
        minlength:10,
        maxlength:10,
        validate:{
            validator: function(value){
                return validator.isNumeric(value)
            },
            message: function(){
                return 'invalid mobile format'
            }
        }
    },
    dob: {
        type: String,  // "dob": "1995/11/08"
        validate: [function (dob) {
            // console.log(moment(dob, "YYYYMMDD").fromNow().split(' ')[0])  //24
            return moment(dob, "YYYYMMDD").fromNow().split(' ')[0] > 21
        }, 'age should be above 21']
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 150,
    },
    // confirmPassword:{
    //     type: String,
    //     required: true,
    //     minlength: 5,
    //     maxlength: 150,
    // },
    terms_conditions:{
        type: Boolean,
        require: true,
        default: false,
        validate: [function (terms_conditions) {
            return (terms_conditions === true || terms_conditions === 'true')
        }, 'terms_conditions must be true!']
    },
    tokens:[
        {
            token:{
                type: String
            },
            createdAt:{
                type: Date,
                value: Date.now()
            }
        }
    ]
})

//instance inbuilt-methods  (before register)
userSchema.pre('save', function(next){
    const user = this
    console.log('request body: ',user)
    if(user.isNew){
        console.log('inside pre: ',user)
        bcryptjs.genSalt(10)
            .then(salt=>{
                bcryptjs.hash(user.password, salt)
                    .then(encryptedPassword=>{
                        user.password = encryptedPassword
                        next()
                    })
            })
    }else{
        next()
    }
})


//instance methods  (login)
userSchema.methods.generateToken = function(){
    const user = this
    
    const tokenData = {
        _id: user._id,
        username: user.username,
        createdAt: Number(new Date())
    }

    const token = jwt.sign(tokenData, "jwt@123")
    user.tokens.push({token})

    return user.save()
        .then(user=>{
            return Promise.resolve(token)
        })
        .catch(err=>{
            return Promise.reject(err)
        })
}


// function comparePasswords(user, typedPassword, oldPassword){
//     return bcryptjs.compare(typedPassword, oldPassword)
//         .then(result=>{
//             console.log("result",result)
//             if(result){
//                 return Promise.resolve(user)
//             }else{
//                 return Promise.reject('Incorrect password')
//             }
//         })
//         .catch(err=>{
//             return Promise.reject(err)
//         })
// }
 
//static methods   (login)
userSchema.statics.findByCredentials = function(body){
    const User = this
    console.log("body",body)
    // return User.findOne({email})
    return User.findOne({ '$or':[{email: body.email},{username: body.username},{mobile: body.mobile}] })
        .then(user=>{
            if(user){
                return bcryptjs.compare(body.password, user.password)
                    .then(result=>{
                        if(result){
                            return Promise.resolve(user)
                        }else{
                            return Promise.reject('Incorrect password')
                        }
                    })
                    .catch(err=>{
                        return Promise.reject(err)
                    })
                // const result = comparePasswords(user, body.password, user.password)
                // return result
                
            }else{
                return Promise.reject('Incorrect email')
            }
        })
        .catch(err=>{
            return Promise.reject(err)
        })
}


//updating password - instance method

userSchema.methods.updatingPassword = function(user, typedPassword, oldPassword){
    const result = comparePasswords(user, typedPassword, oldPassword)
    return result
}


userSchema.statics.findByToken = function(token){
    const User = this
    let tokenData
    try{
        tokenData = jwt.verify(token, 'jwt@123') 
    }catch(err){
        return Promise.reject(err)
    }
    return User.findOne({ _id: tokenData._id, 'tokens.token': token})
}


const User = mongoose.model('User', userSchema)

module.exports = User