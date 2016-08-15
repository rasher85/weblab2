var Labs = require('../../models/labs')

var router = require('express').Router()


router.get('/labId/:name', function(req,res,next){
  console.log('povlacenje')
  console.log(req.params.name)
  Labs.find({name: req.params.name})
  .exec(function(err,labs){
    if (err) { return next(err) }
    res.json(labs)
    console.log('#############################################################')
    console.log(labs)
  })

})

router.get('/labslist', function(req,res,next){
    console.log('vadim sve podatke');
    Labs.find({}, 'name description tumb labLinks', function(err,a){
        if (err) {return next(err)}
        res.json(a)
    })
})

router.post('/', function(req,res,next){

  console.log('postovanje')  
  
  console.log('#############################################################')
  console.log(req.body)
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
    assignments: req.body.assignments
  })
  labs.save(function(err,labs){
    if (err) {return next(err)}
    res.json(201, labs)
  })
})

module.exports = router
