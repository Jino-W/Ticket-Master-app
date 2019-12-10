const Customer = require('../models/customer')
const Ticket = require('../models/ticket')
const _ = require('lodash')

module.exports.list = (req,res)=>{
    Customer.find()
        .then((customers)=>{
            // const newCustomer = customers.map(customer=>{
            //     Ticket.find() 
            //         .then(tickets=>{
            //             const array = tickets.filter(t=>{
            //                 return t.customer == id
            //             })
            //             const tickets1 = []
            //             array.map(a=>{
            //                 tickets1.push(a._id)
            //             })
            //             customer.tickets = tickets1
            //             // return res.json(customer)
            //         })
            //         .catch(err => res.json(err))
            //         return customer
            // })
            return res.json(customers)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports.create =(req,res)=>{
    const {body} = req
    const customer = new Customer(body)
    customer.save()
        .then((customer)=>{
            res.json(customer)
        })
        .catch((err)=>{
            res.json({errors:err})
        })
}

module.exports.show =(req,res)=>{
    const id = req.params.id
    Promise.all([Customer.findById(id), Ticket.find({customer: id})])
        .then(values=>{
            res.json({
                customer: values[0],
                tickets: values[1]
            })
        })
        .catch(err=>{
            res.json(err)
        })
}


module.exports.update = (req,res)=>{
    const id = req.params.id
    const body = req.body
    Customer.findByIdAndUpdate(id, body, {new:true, runValidators : true})
        .then((customer)=>{
            if(customer){
                res.json(customer)
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
    Promise.all([Customer.findByIdAndDelete(id), Ticket.deleteMany({customer: id})])
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
