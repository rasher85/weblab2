var db = require('../db')
var Labs = db.model('Labs', {
  name: { type: String, required: true},
  description:     {type: String, required: true, default: "Not insterted!" },
  tumb: {type: String, required: true, default: "Not insterted!"},
  dateCreated:     { type: Date, required: true, default: Date.now},
  experimentStructure: {type: String, required: true, default: "Not insterted!"},
  CaMapparatus: {type: String, required: true, default: "Not insterted!"},
  MaPbackground: {type: String, required: true, default: "Not insterted!"},
  labLinks: [{type: String}],
  guide: {type: String, required: true, default: "Not insterted!"},
  skeleton: {type: String, required: true, default: "Not insterted!"},
  assignments: {type: String, required: true, default: "Not insterted!"},
  short: {type: String, required: true},
  setupDescript: [{type: String}],
  
})
module.exports = Labs
