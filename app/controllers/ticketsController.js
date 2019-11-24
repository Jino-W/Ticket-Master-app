const Ticket = require('../models/ticket')
const Employee = require('../models/employee')
const _ = require('lodash')


module.exports.list = (req,res)=>{
    Ticket.find().populate('department', ['_id', "name"]).populate('customer', ['_id', "name"])
        .then((tickets)=>{
            res.json(tickets)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports.create =(req,res)=>{
    const {body} = req
    const ticket = new Ticket(body)
    ticket.save()
        .then((ticket)=>{
            res.json(ticket)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports.show =(req,res)=>{
    const id = req.params.id
    Ticket.findById(id).populate('department', ['_id', "name"]).populate('customer', ['_id', "name"])
    
        .then((ticket)=>{
           if(ticket){
                Employee.find({department: ticket.department})
                    .then(employees=>{
                        res.json({
                            ticket,
                            employees
                        })
                    })
                    .catch(err=>{
                        res.json(err)
                    })
            }
            else{
                res.json({})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}


module.exports.update = (req,res)=>{
    const id = req.params.id
    const body = req.body
    Ticket.findByIdAndUpdate(id, body, {new:true, runValidators : true})
        .then((ticket)=>{
            if(ticket){
                res.json(ticket)
            }
            else{
                res.json({})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports.destroy = (req,res)=>{
    const id = req.params.id
    Ticket.findByIdAndDelete(id)
        .then((ticket)=>{
            if(ticket){
                res.json(ticket)
            }
            else{
                res.json({})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}