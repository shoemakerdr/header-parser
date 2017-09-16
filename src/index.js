const path = require('path')
const express = require('express')
const app = express()
const Parser = require('./parser')

const publicDir = path.join(__dirname, '../', 'public')
const html = path.join(__dirname, '../', 'public', 'index.html')

const getIP = (req,res,next) => {
    console.log(req.ip)
    next()
}

app.use('/', express.static(path.normalize(publicDir)))

app.get('/', (req, res) => {
    res.sendFile(path.normalize(html))
})

app.get('/whoami', getIP, (req, res) => {
    console.log(req.ip)
    const parse = new Parser(req)
    res.json(parse.getHash())
})

app.listen(process.env.PORT || 8000)
