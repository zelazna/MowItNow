const assert = require('assert')
const { parseEntry } = require('../../app/utils/parse-entry')
const { isEqual } = require('../../app/utils/is_egal')

let entry

describe('#parseEntry', () => {
  beforeEach(() => {
    entry = '4 4\n 3 7 6 W\nADAADADDA'
  })
  it('should return the expected value', () => {
    const { gridSize, mowersData } = parseEntry(entry)
    // can't check 2 array equality so use isEqual
    assert.strictEqual(isEqual(gridSize, ['4', '4']), true)
    const expected = {
      mowersStartingPosition: [ { x: '', y: '3', orientation: '7' } ],
      mowersCommands: [ [ 'A', 'D', 'A', 'A', 'D', 'A', 'D', 'D', 'A' ] ]
    }
    assert.strictEqual(isEqual(mowersData, expected), true)
  })
})
