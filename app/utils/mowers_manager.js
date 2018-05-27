const { LawnMower } = require('../models/lawn-mower')

class MowersManager {
  /**
   *
   * @param {Object} mowerData
   */
  constructor (mowerData) {
    this.mowers = mowerData.mowersStartingPosition.map((position, index) => {
      return new LawnMower(position, mowerData.mowersCommands[index])
    })
  }

  /**
   *
   * @param {LawnMower} lawn
   * @returns {[Promise]}
   */
  start (lawn) {
    return Promise.all(this.mowers.map(mower => mower.start(lawn)))
  }
}

module.exports = {
  MowersManager
}
