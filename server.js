var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())

app.use('/api/labs', require('./controllers/api/labs'))

app.use('/api/register', require('./controllers/api/register'))

app.use('/', require('./controllers/static'))

app.use('/', require('./controllers/api/login'))

app.use(express.static('./'));

app.listen(3000, function () {
  console.log('Server listening on', 3000)
})
