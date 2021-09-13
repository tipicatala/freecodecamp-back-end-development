var express = require('express');
var bodyParser = require('body-parser')

var app = express();
app.use('/public', express.static(__dirname + '/public'))
app.use('/', function (req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
})
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})
app.get('/json', function (req, res) {
  res.json({"message": process.env['MESSAGE_STYLE'] === 'uppercase'
  ? "HELLO JSON"
  :"Hello json"})
})

app.get('/now', function (req, res, next) {
  req.time = new Date().toString()
  next() 
}, function (req, res) {
  res.send({ time: req.time })
})

app.get('/:word/echo', function(req, res) {
  res.send({echo: req.params.word })
})

app.get('/name', function(req, res) {
  const { first, last } = req.query
  res.json({ name: first + ' ' + last})
})

app.post('/name', function(req, res) {
  const { first, last } = req.body
  res.json({ name: first + ' ' + last})
})

module.exports = app;
