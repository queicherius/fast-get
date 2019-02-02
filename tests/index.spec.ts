/* eslint-env jest */
const _get = require('../src/index')

describe('fast-get', () => {
  it('should work with the path of an object', () => {
    let object = { foo: { bar: { herp: 123, derp: 0 } } }
    expect(_get(object, 'foo.bar.herp')).toEqual(123)
    expect(_get(object, ['foo', 'bar', 'herp'])).toEqual(123)
    expect(_get(object, 'foo.bar')).toEqual({ herp: 123, derp: 0 })
    expect(_get(object, 'foo[bar]')).toEqual({ herp: 123, derp: 0 })
    expect(_get(object, 'foo[bar[herp]]')).toEqual(123)
    expect(_get(object, 'foo.bar.derp')).toEqual(0)

    // Does not mutate input
    expect(object).toEqual({ foo: { bar: { herp: 123, derp: 0 } } })
  })

  it('should return `undefined` if the path of an object does not exist', () => {
    let object = { foo: { bar: { herp: 123 } } }
    expect(_get(object, 'foo.sup.flerp')).toEqual(undefined)

    // Does not mutate input
    expect(object).toEqual({ foo: { bar: { herp: 123 } } })
  })

  it('should return `undefined` if part of an path of an object is falsy', () => {
    let object = { foo: null }
    expect(_get(object, 'foo.bar')).toEqual(undefined)

    // Does not mutate input
    expect(object).toEqual({ foo: null })

    let object2 = { foo: false }
    expect(_get(object2, 'foo.bar')).toEqual(undefined)

    // Does not mutate input
    expect(object2).toEqual({ foo: false })
  })

  it('should return `undefined` if part of an path of an object is not an object', () => {
    let object = { foo: 'herp?' }
    expect(_get(object, 'foo.bar')).toEqual(undefined)

    // Does not mutate input
    expect(object).toEqual({ foo: 'herp?' })
  })

  it('should return the default if the path of an object does not exist', () => {
    let object = { foo: { bar: { herp: 123 } } }
    expect(_get(object, 'foo.sup.flerp', 'the default')).toEqual('the default')

    // Does not mutate input
    expect(object).toEqual({ foo: { bar: { herp: 123 } } })
  })

  it('should work with the path of array elements', () => {
    let object = { foo: { bar: ['hi', { herp: 123 }] } }
    expect(_get(object, 'foo.bar[1].herp')).toEqual(123)
    expect(_get(object, 'foo.bar.[1].herp')).toEqual(123)
    expect(_get(object, ['foo', 'bar', '1', 'herp'])).toEqual(123)
    expect(_get(object, ['foo', 'bar', 1, 'herp'])).toEqual(123)
    expect(_get(object, 'foo.bar.1.herp')).toEqual(123)

    // Does not mutate input
    expect(object).toEqual({ foo: { bar: ['hi', { herp: 123 }] } })
  })

  it('should work at the start of a path of array elements', () => {
    let object = [{ foo: { bar: ['hi', { herp: 123 }] } }]
    expect(_get(object, '[0].foo.bar[1].herp')).toEqual(123)
    expect(_get(object, '[0].foo.bar.1.herp')).toEqual(123)
    expect(_get(object, '0.foo.bar[1].herp')).toEqual(123)
    expect(_get(object, '0.foo.bar.1.herp')).toEqual(123)

    // Does not mutate input
    expect(object).toEqual([{ foo: { bar: ['hi', { herp: 123 }] } }])
  })

  it('should return `undefined` if the path of array elements does not exist', () => {
    let object = { foo: { bar: [{ herp: 123 }] } }
    expect(_get(object, 'foo.bar[1].herp')).toEqual(undefined)
    expect(_get(object, 'foo.bar.1.herp')).toEqual(undefined)
    expect(_get(object, 'foo.sup[0].herp')).toEqual(undefined)
    expect(_get(object, 'foo.sup.0.herp')).toEqual(undefined)
    expect(_get(object, 'foo.bar[0].flerp')).toEqual(undefined)
    expect(_get(object, 'foo.bar.0.flerp')).toEqual(undefined)

    // Does not mutate input
    expect(object).toEqual({ foo: { bar: [{ herp: 123 }] } })
  })

  it('should return the default if the path of array elements does not exist', () => {
    let object = { foo: { bar: [{ herp: 123 }] } }
    expect(_get(object, 'foo.bar[1].herp', 'the default')).toEqual('the default')
    expect(_get(object, 'foo.bar.1.herp', 'the default')).toEqual('the default')
    expect(_get(object, 'foo.sup[0].herp', 'the default')).toEqual('the default')
    expect(_get(object, 'foo.sup.0.herp', 'the default')).toEqual('the default')
    expect(_get(object, 'foo.bar[0].flerp', 'the default')).toEqual('the default')
    expect(_get(object, 'foo.bar.0.flerp', 'the default')).toEqual('the default')
    expect(object).toEqual({ foo: { bar: [{ herp: 123 }] } })
  })

  it('should return `undefined` if object does not exist', () => {
    expect(_get(null, 'foo.bar')).toEqual(undefined)
    expect(_get(undefined, 'foo.bar')).toEqual(undefined)
  })

  it('should return `undefined` if object is not an object', () => {
    expect(_get('wat', 'foo.bar')).toEqual(undefined)
  })

  it('should return `undefined` if the path is malformed', () => {
    let object = { foo: { bar: [{ herp: 123 }] } }
    expect(_get(object, 'foo..')).toEqual(undefined)
    expect(_get(object, 'foo.[].bar')).toEqual(undefined)
    expect(_get(object, 'foo..bar')).toEqual(undefined)
    expect(_get(object, '.foo.bar')).toEqual(undefined)
    expect(_get(object, 'foo......[2][1][0].bar')).toEqual(undefined)
    expect(_get(object, 'foo......[[1][0].bar')).toEqual(undefined)
    expect(_get(object, 'foo......[[1][0].bar')).toEqual(undefined)
  })
})
