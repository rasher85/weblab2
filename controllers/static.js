var express = require('express')
var router = require('express').Router()


router.get('/', function(req,res){
  res.sendfile('testReg.html')
  console.log('statika')
})
module.exports = router
