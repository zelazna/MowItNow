const { compassPoints, orientations } = require('../constants')

class LawnMower {
  /**
   *
   * @param {Object} position the position and orientation of the mower
   * @param {*} instructions the set of command to execute
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
  async start (lawn) {
    return new Promise((resolve, reject) => {
      this.lawn = lawn
      try {
        this.instructions.map(instruction => this._run(instruction))
        resolve(`${this.x} ${this.y} ${this.orientation}`)
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * handle rotate and move
   * @param {String} instruction
   */
  _run (instruction) {
    if (orientations.includes(instruction)) {
      this._rotate(instruction)
    } else if (instruction === 'A') {
      this._move()
    }
  }

  /**
   * move the mower
   * @param {String} instruction
   */
  _move (instruction) {
    const destination = this._directions(this.orientation)
    if (!this.lawn.cellBusy(destination)) {
      if (!this.lawn.outside(destination)) {
        this.position = destination
        this.lawn.clearPosition({x: this.x, y: this.y})
        this.lawn.busyCells.push(destination)
      }
    } else {
      // if the cell is busy recursively retry
      setTimeout(() => this._move(instruction), 0)
    }
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
