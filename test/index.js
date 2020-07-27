import { assert } from 'chai'

import parseIcssExports from '../src'

import cssExports from './data.json'

const parsedExports = parseIcssExports(cssExports)
const unitlessExports = parseIcssExports(cssExports, { unitless: true })

describe('Library', () => {
  it('exports a function', () => {
    assert(typeof parseIcssExports === 'function', 'instance not a function')
  })
  it('returns an object', () => {
    assert(typeof parsedExports === 'object', 'return data not an object')
  })
  it('parses numbers', () => {
    assert(
      typeof parsedExports.simpleNumber === 'number',
      'return type is not a number'
    )
    assert(
      typeof parsedExports.numberWithUnit === 'string',
      'strips units when not required'
    )
  })
  it('parses colors', () => {
    assert(
      typeof parsedExports.namedColor === 'string',
      'return type is not a string'
    )
    assert(
      typeof parsedExports.hexColor === 'string',
      'return type is not a string'
    )
  })
  it('parses JSON', () => {
    assert(typeof parsedExports.map === 'object', 'exported map is not parsed')
    assert(Array.isArray(parsedExports.list), 'exported map is not parsed')
  })
  it('strips units', () => {
    assert(
      typeof unitlessExports.numberWithUnit === 'number',
      'return type is not a number'
    )
  })
})
