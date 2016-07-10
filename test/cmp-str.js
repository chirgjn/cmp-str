'use strict'

var cmpStr = require('../index')
var expect = require('chai').expect

describe('cmp-str: compares two strings lexographically', function () {
  it('is a function', function() {
    expect(cmpStr).to.be.a('function')
  })
  it('returns null if passed less than 2 arguments', function() {
    expect(cmpStr()).to.be.null
    expect(cmpStr('abc')).to.be.null
  })
  it('returns null if passed Numbers, Objects, or Arrays', function() {
    expect(cmpStr('xyz', 123)).to.be.null
    expect(cmpStr({a:'xyz'}, 'Abc')).to.be.null
    expect(cmpStr('', [])).to.be.null
    expect(cmpStr(undefined, 'hi')).to.be.null
  })
  it('returns null if passed null, undefinded, or false', function() {
    expect(cmpStr('xyz', null)).to.be.null
    expect(cmpStr(undefined, 'Abc')).to.be.null
    expect(cmpStr(false, [])).to.be.null
  })
  it('returns a value > 0 if first argument is lexographically greater than the second', function() {
    expect(cmpStr('bbc','abc')).to.be.above(0)
    expect(cmpStr('abcd','abc')).to.be.above(0)
    expect(cmpStr('S','')).to.be.above(0)
  })
  it('returns a value < 0 if first argument is lexographically smaller than the second', function() {
    expect(cmpStr('xyz','z')).to.be.below(0)
    expect(cmpStr('Bak','bak')).to.be.below(0)
    expect(cmpStr('','A')).to.be.below(0)
  })
  it('returns 0 if first argument is lexographically equal to the second', function() {
    expect(cmpStr('z','z')).to.equal(0)
    expect(cmpStr('Abc','Abc')).to.equal(0)
    expect(cmpStr('xYz','xYz')).to.equal(0)
    expect(cmpStr('','')).to.equal(0)
  })
  it('lowerCase letters are considered greater than uppercase', function() {
    expect(cmpStr('aG','Ag')).to.be.above(0)
    expect(cmpStr('Zb','ZB')).to.be.above(0)
    expect(cmpStr('kq','KQ')).to.be.above(0)
  })
  it('ignores all arguments after the 2nd one', function() {
    expect(cmpStr('a','A',123)).to.be.above(0)
    expect(cmpStr('xyz','z',[],'abc')).to.be.below(0)
    expect(cmpStr('','',{y:'hey'})).to.equal(0)
  })
  it('Works with both String objects and literals', function() {
    expect(cmpStr(new String('bbc'), new String('abc'))).to.be.above(0)
    expect(cmpStr('abcd', new String('abc'))).to.be.above(0)
    expect(cmpStr(new String('S'), '')).to.be.above(0)
    expect(cmpStr(new String('xyz'), 'z')).to.be.below(0)
    expect(cmpStr('Bak', new String('bak'))).to.be.below(0)
    expect(cmpStr(new String(''), 'A')).to.be.below(0)
    expect(cmpStr(new String('xYz'), 'xYz')).to.equal(0)
    expect(cmpStr('', new String(''))).to.equal(0)
    expect(cmpStr(new String('Zb'),'ZB')).to.be.above(0)
  })
  it('Doesn\'t mutate(modify) the passed arguments', function() {
    var s1 = new String('bbc')
    var s2 = new String('abc')
    cmpStr(s1, s2)
    expect(s1.valueOf()).to.equal('bbc')
    expect(s2.valueOf()).to.equal('abc')

    s1 = new String('bbD')
    s2 = 'kQy'
    cmpStr(s1, s2)
    expect(s1.valueOf()).to.equal('bbD')
    expect(s2).to.equal('kQy')

    s1 = 'kyN'
    s2 = new String('Kbx')
    cmpStr(s1, s2)
    expect(s1).to.equal('kyN')
    expect(s2.valueOf()).to.equal('Kbx')

    s1 = ['x','y','z']
    var temp = s1
    s2 = new String('Kbx')
    cmpStr(s1, s2)
    expect(s1).to.equal(temp)
    expect(s2.valueOf()).to.equal('Kbx')

    s1 = 'kyN'
    s2 = {a:'2', b:[1, {x:5}]}
    temp = s2
    cmpStr(s1, s2)
    expect(s1).to.equal('kyN')
    expect(s2).to.equal(temp)
  })
})
