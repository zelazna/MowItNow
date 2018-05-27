/**
 *
 * @param {String} input
 * @returns {Object} config for the grid and the mowers
 */
function parseEntry (input) {
  var lines = input.split('\n')
  const gridSize = lines.shift().split(' ')
  const mowersStartingPosition = lines
    .filter((elem, index) => index % 2 === 0)
    .map(parsePosition)
  const mowersCommands = lines
    .filter((elem, index) => index % 2 !== 0)
    .map(row => row.split(''))
  const mowersData = { mowersStartingPosition, mowersCommands }
  return { gridSize, mowersData }
}

/**
 *
 * @param {String} position
 * @returns a single config object for mower
 */
function parsePosition (position) {
  const [ x, y, orientation ] = position.split(' ')
  return { x, y, orientation }
}

module.exports = {
  parseEntry
}
