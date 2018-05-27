const assert = require('assert')
const { parseEntry } = require('../app/utils/parse-entry')
const { MowersManager } = require('../app/utils/mowers_manager')
const { Lawn } = require('../app/models/lawn')

const entry = `5 5
1 2 N
GAGAGAGAA
3 3 E
ADAADADDA
5 2 S
AGAGAADAGA`

const expected = `1 3 N
4 1 E
5 4 N`

const { gridSize, mowersData } = parseEntry(entry)
const lawn = new Lawn(gridSize)

const manager = new MowersManager(mowersData)
manager.start(lawn)
  .then(result => assert.strictEqual(result.join('\n'), expected))
  .catch(console.log)
