const express = require('express')
const routes = require('./routes.js')
const app = express()

require('dotenv').config()

app.use(express.json())
app.use(routes)

app.listen(process.env.PORT, () => {
    console.log("Starting Server")
})