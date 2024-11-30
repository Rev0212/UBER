const dontenv = require('dotenv')
dontenv.config();


const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.get('/',(req,res) => {
    res.send('Hello Word')
}
)

module.exports = app; 