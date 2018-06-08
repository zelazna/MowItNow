const assert = require('assert')
const { factory } = require('../factory')
let lawn

describe('Lawn', () => {
  beforeEach(() => {
    lawn = factory.createLawn()
  })
  describe('#clearPosition', () => {
    it('must clear the position', () => {
      lawn.clearPosition({ x: 1, y: 2 })
      assert.strictEqual(lawn.busyCells.length, 0)
    })
  })
  describe('#outside', () => {
    it('must return true when coord are outside the lawn', () => {
      assert(lawn.outside({x: 2, y: 2}))
    })
    it('must return false when coord are inside the lawn', () => {
      assert.strictEqual(lawn.outside({x: 1, y: 1}), false)
    })
  })
  describe('#cellBusy', () => {
    it('must return true when the cell is busy', () => {
      assert(lawn.cellBusy({x: 1, y: 2}))
    })
    it('must return false when he cell is not busy', () => {
      assert.strictEqual(lawn.cellBusy({x: 1, y: 1}), false)
    })
  })
})
