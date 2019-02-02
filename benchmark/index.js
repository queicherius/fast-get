// Load the benchmarking helper
const Benchmark = require('benchmark')
const suite = new Benchmark.Suite()

// Load the modules to compare and some default test object
const lodash = require('lodash.get')
const fastGet = require('../dist/src/index.js')
const object = { foo: { bar: { herp: 123 } } }

// Run the modules against each other
suite
  .add('lodash.get path', function () {
    lodash(object, ['foo', 'bar', 'herp' + Math.random()])
  })
  .add('lodash.get string', function () {
    lodash(object, 'foo.bar.herp' + Math.random())
  })
  .add('fast-get path', function () {
    fastGet(object, ['foo', 'bar', 'herp' + Math.random()])
  })
  .add('fast-get string', function () {
    fastGet(object, 'foo.bar.herp' + Math.random())
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ 'async': true })
