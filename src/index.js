const path = require('path')
const express = require('express')
const app = express()
const Parser = require('./parser')

const publicDir = path.join(__dirname, '../', 'public')
const html = path.join(__dirname, '../', 'public', 'index.html')

app.use('/', express.static(path.normalize(publicDir)))

app.get('/', (req, res) => {
    res.sendFile(path.normalize(html))
})

app.get('/whoami', (req, res) => {
    console.log(`IP ADDRESS: ${req.ip}`)
    console.log(`REQUEST HEADERS:`)
    console.log(req.headers)
    const parse = new Parser(req)
    res.json(parse.getHash())
})

app.listen(process.env.PORT || 8000)
