/* eslint-env node, mocha */
import {expect} from 'chai'
import _get from '../src/index.js'

describe('fast-get', () => {
  it('should work with the path of an object', () => {
    let object = {foo: {bar: {herp: 123}}}
    expect(_get(object, 'foo.bar.herp')).to.equal(123)
    expect(_get(object, ['foo', 'bar', 'herp'])).to.equal(123)
    expect(_get(object, 'foo.bar')).to.deep.equal({herp: 123})
    expect(_get(object, 'foo[bar]')).to.deep.equal({herp: 123})
    expect(_get(object, 'foo[bar[herp]]')).to.deep.equal(123)
    expect(object, 'does not mutate input').to.deep.equal({foo: {bar: {herp: 123}}})
  })

  it('should return `undefined` if the path of an object does not exist', () => {
    let object = {foo: {bar: {herp: 123}}}
    expect(_get(object, 'foo.sup.flerp')).to.equal(undefined)
    expect(object, 'does not mutate input').to.deep.equal({foo: {bar: {herp: 123}}})
  })

  it('should return `undefined` if part of an path of an object is falsy', () => {
    let object = {foo: null}
    expect(_get(object, 'foo.bar')).to.equal(undefined)
    expect(object, 'does not mutate input').to.deep.equal({foo: null})

    let object2 = {foo: false}
    expect(_get(object2, 'foo.bar')).to.equal(undefined)
    expect(object2, 'does not mutate input').to.deep.equal({foo: false})
  })

  it('should return `undefined` if part of an path of an object is not an object', () => {
    let object = {foo: 'herp?'}
    expect(_get(object, 'foo.bar')).to.equal(undefined)
    expect(object, 'does not mutate input').to.deep.equal({foo: 'herp?'})
  })

  it('should return the default if the path of an object does not exist', () => {
    let object = {foo: {bar: {herp: 123}}}
    expect(_get(object, 'foo.sup.flerp', 'the default')).to.equal('the default')
    expect(object, 'does not mutate input').to.deep.equal({foo: {bar: {herp: 123}}})
  })

  it('should work with the path of array elements', () => {
    let object = {foo: {bar: ['hi', {herp: 123}]}}
    expect(_get(object, 'foo.bar[1].herp')).to.equal(123)
    expect(_get(object, 'foo.bar.[1].herp')).to.equal(123)
    expect(_get(object, ['foo', 'bar', '1', 'herp'])).to.equal(123)
    expect(_get(object, ['foo', 'bar', 1, 'herp'])).to.equal(123)
    expect(_get(object, 'foo.bar.1.herp')).to.equal(123)
    expect(object, 'does not mutate input').to.deep.equal({foo: {bar: ['hi', {herp: 123}]}})
  })

  it('should work at the start of a path of array elements', () => {
    let object = [{foo: {bar: ['hi', {herp: 123}]}}]
    expect(_get(object, '[0].foo.bar[1].herp')).to.equal(123)
    expect(_get(object, '[0].foo.bar.1.herp')).to.equal(123)
    expect(_get(object, '0.foo.bar[1].herp')).to.equal(123)
    expect(_get(object, '0.foo.bar.1.herp')).to.equal(123)
    expect(object, 'does not mutate input').to.deep.equal([{foo: {bar: ['hi', {herp: 123}]}}])
  })

  it('should return `undefined` if the path of array elements does not exist', () => {
    let object = {foo: {bar: [{herp: 123}]}}
    expect(_get(object, 'foo.bar[1].herp')).to.equal(undefined)
    expect(_get(object, 'foo.bar.1.herp')).to.equal(undefined)
    expect(_get(object, 'foo.sup[0].herp')).to.equal(undefined)
    expect(_get(object, 'foo.sup.0.herp')).to.equal(undefined)
    expect(_get(object, 'foo.bar[0].flerp')).to.equal(undefined)
    expect(_get(object, 'foo.bar.0.flerp')).to.equal(undefined)
    expect(object, 'does not mutate input').to.deep.equal({foo: {bar: [{herp: 123}]}})
  })

  it('should return the default if the path of array elements does not exist', () => {
    let object = {foo: {bar: [{herp: 123}]}}
    expect(_get(object, 'foo.bar[1].herp', 'the default')).to.equal('the default')
    expect(_get(object, 'foo.bar.1.herp', 'the default')).to.equal('the default')
    expect(_get(object, 'foo.sup[0].herp', 'the default')).to.equal('the default')
    expect(_get(object, 'foo.sup.0.herp', 'the default')).to.equal('the default')
    expect(_get(object, 'foo.bar[0].flerp', 'the default')).to.equal('the default')
    expect(_get(object, 'foo.bar.0.flerp', 'the default')).to.equal('the default')
    expect(object, 'does not mutate input').to.deep.equal({foo: {bar: [{herp: 123}]}})
  })

  it('should return `undefined` if object does not exist', () => {
    expect(_get(null, 'foo.bar')).to.equal(undefined)
    expect(_get(undefined, 'foo.bar')).to.equal(undefined)
  })

  it('should return `undefined` if object is not an object', () => {
    expect(_get('wat', 'foo.bar')).to.equal(undefined)
  })

  it('should return `undefined` if the path is malformed', () => {
    let object = {foo: {bar: [{herp: 123}]}}
    expect(_get(object, 'foo..')).to.equal(undefined)
    expect(_get(object, 'foo.[].bar')).to.equal(undefined)
    expect(_get(object, 'foo..bar')).to.equal(undefined)
    expect(_get(object, '.foo.bar')).to.equal(undefined)
    expect(_get(object, 'foo......[2][1][0].bar')).to.equal(undefined)
    expect(_get(object, 'foo......[[1][0].bar')).to.equal(undefined)
    expect(_get(object, 'foo......[[1][0].bar')).to.equal(undefined)
  })
})
