const express = require('express')
const request = require('request')
const path = require('path')
const fs = require('fs')
const { Server } = require('http')
const osc = require('node-osc')

const app = express()

//const env = process.env.NODE_ENV || 'development'
//const port = process.env.PORT || 3000

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.render('index.html')
})
const port = 3000
let server = app.listen(port, () => {
    console.log(`Listening at localhost:${port}`)
})

const io = require('socket.io')(server)
const oscServer = new osc.Server(9999, '0.0.0.0')

io.on('connection', (socket) => {
    oscServer.on('message', (msg, rinfo) => {
        request('https://randomuser.me/api/', (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let picUrl = JSON.parse(body).results[0].picture.medium
                console.log(picUrl)
                io.emit('hello', picUrl)
            }
     })
    })
})

// app.set('port', port)
// app.use(Express.static(path.join(__dirname, 'static')))

