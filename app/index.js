const { parseEntry } = require('./utils/parse-entry')
const { MowersManager } = require('./utils/mowers_manager')
const { Lawn } = require('./models/lawn')

const entry = `5 5
1 2 N
GAGAGAGAA
3 3 E
ADAADADDA
5 2 S
AGAGAADAGA`

const { gridSize, mowersData } = parseEntry(entry)
const lawn = new Lawn(gridSize)

const manager = new MowersManager(mowersData)
manager.start(lawn)
  .then(console.log)
  .catch(console.log)
