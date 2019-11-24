const User = require("../models/user")

const authentication = function(req, res, next){
    const token = req.header('x-auth')
    User.findByToken(token)
        .then(user=>{
            if(user){
                req.user = user,
                req.token = token
                next()
            }else{
                res.status('401').json({'notice':'Invalid Token'})
            }
        })
        .catch(err=>{
            res.json(err)
        })
}

module.exports = authentication
