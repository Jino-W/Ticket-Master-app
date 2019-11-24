const mongoose = require('mongoose')

const connectDB =()=>{
    mongoose.connect('mongodb://localhost:27017/ticket-master-app', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false  })
        .then(()=>{
            console.log('connected to db')
        })
        .catch((err)=>{
            console.log(err)
        })
}

module.exports = connectDB