# fast-get

[![Build Status](https://img.shields.io/travis/queicherius/fast-get.svg?style=flat-square)](https://travis-ci.org/queicherius/fast-get)
[![Coverage Status](https://img.shields.io/codecov/c/github/queicherius/fast-get/master.svg?style=flat-square)](https://codecov.io/github/queicherius/fast-get) [![Greenkeeper badge](https://badges.greenkeeper.io/queicherius/fast-get.svg)](https://greenkeeper.io/)

> Gets the value at `path` of `object` (with an optional `default`)

## Install

```bash
npm install fast-get
```

This module can be used for Node.js as well as browsers using [Browserify](https://github.com/substack/browserify-handbook#how-node_modules-works).

## Usage

```js
const _get = require('fast-get')

const object = {a: [{b: {c: 3}}]}

_get(object, 'a[0].b.c')
// => 3

_get(object, ['a', '0', 'b', 'c'])
// => 3

_get(object, 'a.b.c', 'default')
// => 'default'
```

## Tests

```bash
npm test
```

## Benchmark

```bash
npm run benchmark
```

|            | Size (uglify + gzip) | Performance (array) | Performance (string) |
|------------|----------------------|---------------------|----------------------|
| fast-get   | 220 bytes            | 612,000 ops/sec     | 571,000 ops/sec      |
| lodash.get | 2,145 bytes          | 810,000 ops/sec     | 200,000 ops/sec      |

## Licence

MIT
