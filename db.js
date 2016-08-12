var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/labs', function (){
  console.log('mongodb connected')
})
module.exports = mongoose
