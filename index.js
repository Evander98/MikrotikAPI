const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 2000 //8728 mikrotik port

app.use(bodyParser.json())
app.use(cors())

const { mikrotikRouter, pdfRouter } = require('./routers')

app.get('/', (req, res) => {
    res.send('<h1>Welcome to Mikrotik API</h1><br><p>All rights reserved by Evander Kristalino (2019)</p>')
})

app.use('/mikrotik', mikrotikRouter)
app.use('/pdf', pdfRouter)


app.listen(port, () => console.log('Server Running On Port ' + port))