class Lawn {
  /**
   *
   * @param {Array} array [x,y]
   */
  constructor ([ maxX, maxY ]) {
    this.maxY = maxY
    this.maxX = maxX
    this.busyCells = []
  }

  /**
   * remove the busy cells
   * @param {Object} position
   */
  clearPosition (position) {
    var idx = this.busyCells.findIndex(e => e.x === position.x && e.y === position.y)
    this.busyCells.splice(idx, 1)
  }

  /**
   * Check if the cell belong to the Lawn
   * @param {Object} destination
   * @returns {Boolean} true if the coordinates doesnt belong to the lawn false otherwise
   */
  outside (destination) {
    return destination.y < 0 || destination.x < 0 || destination.y > this.maxY || destination.x > this.maxX
  }

  /**
   * Check if the cell is already occuped by another Mower
   * @param {Object} destination
   * @returns {Boolean} true if the cell is busy false otherwise
   */
  cellBusy (destination) {
    return !!this.busyCells.filter(e => e.y === destination.y && e.x === destination.x).length
  }
}

module.exports = {
  Lawn
}
