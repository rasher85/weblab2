var Labs = require('../../models/labs')

var router = require('express').Router()


router.get('/', function(req,res,next){
  console.log('povlacenje')
  console.log(req.query.name)
  Labs.find({name: req.query.name})
  .exec(function(err,labs){
    if (err) { return next(err) }
    res.json(labs)
    console.log(labs)
  })

})

router.post('/', function(req,res,next){

  console.log('postovanje')
  var labs = new Labs({
    name: req.body.name,
    description: req.body.description,
    tumb: req.body.tumb,
    experimentStructure: req.body.experimentStructure,
    CaMapparatus: req.body.CaMapparatus,
    MaPbackground: req.body.MaPbackground,
    labLinks: req.body.labLinks,
    guide: req.body.guide,
    skeleton: req.body.skeleton,
    assignments: req.body.assignments,
    short: req.body.short,
    setupDescript: req.body.setupDescript
  })
  labs.save(function(err,labs){
    if (err) {return next(err)}
    res.json(201, labs)
  })
})

module.exports = router
