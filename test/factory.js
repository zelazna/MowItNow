const { Lawn } = require('../app/models/lawn')
const { LawnMower } = require('../app/models/lawn-mower')

class Factory {
  createLawn () {
    const lawn = new Lawn([1, 2])
    lawn.busyCells.push({ x: 1, y: 2 })
    return lawn
  }

  createMower () {
    return new LawnMower({x: 1, y: 2, orientation: 'N'}, ['G', 'A'])
  }
}

const factory = new Factory()

module.exports = {
  factory
}
