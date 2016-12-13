// Load the benchmarking helper
var Benchmark = require('benchmark')
var suite = new Benchmark.Suite()

// Load the modules to compare and some default test object
var lodash = require('lodash.get')
var mine = require('../build/index.js').default
var object = {foo: {bar: {herp: 123}}}

// Run the modules against each other
suite
  .add('lodash.get', function () {
    lodash(object, 'foo.bar.herp' + Math.random())
  })
  .add('fast-get', function () {
    mine(object, 'foo.bar.herp' + Math.random())
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({'async': true})
