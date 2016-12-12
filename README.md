# get

[![Build Status](https://img.shields.io/travis/random-js-helpers/get.svg?style=flat-square)](https://travis-ci.org/random-js-helpers/get)
[![Coverage Status](https://img.shields.io/codecov/c/github/random-js-helpers/get/master.svg?style=flat-square)](https://codecov.io/github/random-js-helpers/get)

> Gets the value at `path` of `object` (with an optional `default`)

## Install

```bash
npm install random-js-helpers.get
```

This module can be used for Node.js as well as browsers using [Browserify](https://github.com/substack/browserify-handbook#how-node_modules-works).

## Usage

```js
import _get from 'random-js-helpers.get'

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

|                       | Size (uglify + gzip) | Performance     |
|-----------------------|----------------------|-----------------|
| random-js-helpers.get | 237 bytes            | 498,648 ops/sec |
| lodash.get            | 2145 bytes           | 120,422 ops/sec |

## Licence

MIT
