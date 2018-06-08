const assert = require('assert')
const { factory } = require('../factory')

let lawn, mower

describe('LawnMower', () => {
  beforeEach(() => {
    lawn = factory.createLawn()
    mower = factory.createMower()
  })
  describe('#start', () => {
    it('must return the right final coordinates', (done) => {
      mower.start(lawn).then(result => {
        assert.strictEqual(result, '0 2 W')
      }).catch(console.log)
      done()
    })
  })
})
