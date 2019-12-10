const Department = require('../models/department')
const Ticket = require('../models/ticket')
const Employee = require('../models/employee')

module.exports.list = (req,res)=>{
    Department.find()
        .then((departments)=>{
            res.json(departments)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports.create =(req,res)=>{
    const {body} = req
    const department = new Department(body)
    department.save()
        .then((department)=>{
            res.json(department)
        })
        .catch((err)=>{
            res.json({errors:err})
        })
}

module.exports.show =(req,res)=>{
    const id = req.params.id
    // Department.findById(id)
    Promise.all([Department.findById(id), Ticket.find({department: id}), Employee.find({department: id})])
        .then(values=>{
            res.json({
                department: values[0],
                tickets: values[1],
                employees: values[2]
            })
        })
        .catch(err=>{
            res.json(err)
        })
}


module.exports.update = (req,res)=>{
    const id = req.params.id
    const body = req.body
    Department.findByIdAndUpdate(id, body, {new:true, runValidators : true})
        .then((department)=>{
            if(department){
                res.json(department)
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
    Promise.all([Department.findByIdAndDelete(id), Ticket.deleteMany({department: id}), Employee.deleteMany({department: id})])
        .then((value)=>{
            if(value){
                res.json('Datas got deleted successfully')
            }
            else{
                res.json({})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}