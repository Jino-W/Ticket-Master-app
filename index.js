const express = require('express')
const cors = require('cors');
const router = require('./config/routes')
const connectDB = require('./config/database')

const app = express()
const port = 3030

app.use(express.json())
connectDB()
app.use(cors());
app.use('/', router)

app.listen(port, ()=>{
    console.log('listening to port', port)
})
