const { compassPoints, orientations } = require('../constants')

class LawnMower {
  /**
   *
   * @param {Object} position the position and orientation of the mower
   * @param {Array} instructions the set of command to execute
   */
  constructor ({x, y, orientation}, instructions) {
    this.x = parseInt(x)
    this.y = parseInt(y)
    this.orientation = orientation
    this.instructions = instructions
  }

  set position ({x, y}) {
    this.x = x
    this.y = y
  }

  /**
   *
   * @param {Lawn} lawn
   * @returns {Promise}
   */
  start (lawn) {
    this.lawn = lawn
    return this._run()
  }

  /**
   * recursively depile instructions
   * @param {Int} index
   * @returns {Promise}
   */
  _run (index = 0) {
    return new Promise((resolve, reject) => {
      if (index < this.instructions.length) {
        try {
          const computed = this._computeInstructions(this.instructions[index])
          if (computed) index++
          this._run(index)
        } catch (error) {
          reject(error)
        }
      }
      resolve(`${this.x} ${this.y} ${this.orientation}`)
    })
  }

  /**
   * move the mower
   * @param {Object} destination a coord object like { x:1, y:2}
   */
  _move (destination) {
    this.position = destination
    this.lawn.clearPosition({x: this.x, y: this.y})
    this.lawn.busyCells.push(destination)
  }

  /**
   * rotate the mower in the param direction
   * @param {String} direction
   */
  _rotate (direction) {
    const orientationIndex = compassPoints.indexOf(this.orientation)
    if (direction === 'G') {
      const newOrientationIndex = orientationIndex - 1
      this.orientation = compassPoints.hasOwnProperty(newOrientationIndex) ? compassPoints[newOrientationIndex] : compassPoints.slice(-1)[0]
    } else if (direction === 'D') {
      const newOrientationIndex = orientationIndex + 1
      this.orientation = compassPoints.hasOwnProperty(newOrientationIndex) ? compassPoints[newOrientationIndex] : compassPoints[0]
    }
  }

  /**
   * handle rotate and move
   * @param {String} instruction
   * @returns {Boolean} false if the cell is busy true otherwise
   */
  _computeInstructions (instruction) {
    if (orientations.includes(instruction)) {
      this._rotate(instruction)
    } else {
      const destination = this._directions(this.orientation)
      if (!this.lawn.outside(destination)) {
        this._move(destination)
      } else if (this.lawn.cellBusy(destination)) {
        return false
      }
    }
    return true
  }

  /**
   * Mapping for avoid the use of a switch
   * @param {String} letter
   * @returns {Object} the mower destination
   */
  _directions (letter) {
    const directions = {
      'W': { x: this.x - 1, y: this.y },
      'N': { x: this.x, y: this.y + 1 },
      'E': { x: this.x + 1, y: this.y },
      'S': { x: this.x, y: this.y - 1 }
    }
    return directions[letter]
  }
}

module.exports = {
  LawnMower
}
