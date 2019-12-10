const User = require('../models/user')
// const request = require('request')
// const network = require('network')
const _ = require('lodash')

//register
module.exports.create = (req, res)=>{
    const body = req.body
    console.log(body)
    // if(body.password == body.confirmPassword){
        const user = new User(body)
        console.log(user)
        user.save()
            .then(user=>{
                console.log(user)
                res.json(_.pick(user, ["_id", "username", "email", "mobile"]))
            })
            .catch(err=>{
                res.json({errors:err})
            })
    // }else{
        // res.json('passwords doesn\'t match')
    // }
}


//login
module.exports.login = (req, res)=>{
    const body = req.body 
    // network.get_public_ip(function(err, ip) {         //https://ipapi.co/json
    //     console.log(err || 'your device is connected to the ip address',ip)
    // })
    User.findByCredentials(body)
        .then(user=>{
            if(user && user.tokens.length < 5){
                user.generateToken()
                    .then(token=>{
                        console.log("user",user)
                        // res.setHeader('x-auth', token)
                        res.json({token})
                    })
                    .catch(err=>{
                        res.status(401).json(err)
                    })
            }else{
                res.json('active sessions limit exceeded')
            }
        })
        .catch(err=>{
            res.json(err)
        })
}

//account
module.exports.show = (req, res)=>{
    res.send({
        user: req.user,
        active_sessions : req.user.tokens.length
    })
}


//update password
// module.exports.updatePassword = (req, res)=>{
//     const user = req.user
//     const typedPassword = req.body.password
//     const newPassword = req.body.newPassword
//     console.log(user, typedPassword, user.password)
//     user.updatingPassword(user, typedPassword, user.password)
//         .then(user=>{
//             if(user){
//                 user.password = newPassword
//                 console.log("up1", user)
//                 user.save()
//                     .then(user=>{
//                         console.log("up2", user)
//                         res.json(user)
//                     }) 
//                     .catch(err=>{
//                         res.json(err)
//                     })
//             }else{
//                 res.json('Incorrect password')
//             }
//         })
//         .catch(err=>{
//             res.json(err)
//         })
    
// }


//logout
module.exports.destroy =(req, res)=>{
    const {user, token} = req
    User.findByIdAndUpdate(user._id, {'$pull':{'tokens':{'token':token}}})
        .then(()=>{
            res.json('successfully logged out')
        })
        .catch(err=>{
            res.json(err)
        })
}

//logoutAll
module.exports.destroyAll =(req, res)=>{
    const {user} = req
    User.findByIdAndUpdate(user._id, {'$set':{'tokens':[]}})
        .then(()=>{
            res.json('logged out all the devices')
        })
        .catch(err=>{
            res.json(err)
        })
}


//delete user account
// module.exports.deleteAccount = (req,res)=>{
//     const user = req.user
//     User.findByIdAndDelete(user._id)
//         .then(()=>{
//             res.send('Account Deleted Successfully')
//         })
//         .catch(err=>{
//             res.json(err)
//         })
// }