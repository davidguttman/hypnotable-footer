var hypnotable = require('hypnotable')
var es = require('event-stream')

var htfooter = require('../')
var ghUsers    = require('./github.json')
var columns = require('./columns')

var ht = hypnotable(columns)
var htf = htfooter(ht.el, columns)

document.body.appendChild(ht.el)

var rs = es.readArray(ghUsers)
rs.pipe(ht)
rs.pipe(htf)
