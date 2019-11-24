const Employee = require('../models/employee')
const Ticket = require('../models/ticket')


module.exports.list = (req,res)=>{
    Employee.find().populate('department', ['_id', "name"])
        .then((employees)=>{
            res.json(employees)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports.create =(req,res)=>{
    const {body} = req
    const employee = new Employee(body)
    employee.save()
        .then((employee)=>{
            res.json(employee)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports.show =(req,res)=>{
    const id = req.params.id
    // Employee.findById(id).populate('department', ['_id', "name"])
    Employee.findById(id).populate('department', ['_id', "name"])
    .then(employee=>{
        Ticket.find({department: employee.department._id})
        .then(tickets=>{
            res.json({
                employee,
                tickets
            })
        })
        .catch(err=>{
            res.json(err)
        })
        
    })
    .catch(err=>{
        res.json(err)
    })
}


module.exports.update = (req,res)=>{
    const id = req.params.id
    const body = req.body
    Employee.findByIdAndUpdate(id, body, {new:true, runValidators : true})
        .then((employee)=>{
            if(employee){
                res.json(employee)
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
    Employee.findByIdAndDelete(id)
        .then((employee)=>{
            if(employee){
                res.json(employee)
            }
            else{
                res.json({})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}