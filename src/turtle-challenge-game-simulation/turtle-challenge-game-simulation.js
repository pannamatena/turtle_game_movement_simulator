/**
 * This is a game simulation class that expects preset options to be passed as parameters.
 * Then it calculates whether or not the game will end in success or failure, and whether we reach the exit of the given grid area.
 * The game starts at the start coordinate, which marks the tile of the grid where movements are calculated from. The aim is to reach the
 * exit without hitting a tile with a mine on it. Possible outcomes are 'Mine hit!', 'Success' and 'Still in danger'.
 */
class TurtleChallengeGameSimulation {

  /**
   * Instantiates the class.
   *
   * @param grid {{w: number, h: number}} - An object containing the dimensions of the grid, indexed from 0
   * @param moves {string[]} - An array of strings containing movements or rotations. 'rotate' turns the direction 90 degrees right, 'move' moves one tile forward
   * @param start {{x: number, y: number}} - Coordinates of the start tile in the grid
   * @param exit {{x: number, y: number}} - Coordinates of the exit tile in the grid
   * @param mines {{x: number, y: number}[]} - Array of objects containing mine coordinates
   */
  constructor (grid, moves, start, exit, mines) {
    this.grid = grid;
    this.moves = moves;
    this.start = start;
    this.exit = exit;
    this.mines = mines;

    this.validateGridData(grid);
    this.validateGridDataValues(grid);

    this.validateMovesData(moves);
    this.validateMovesDataValues(moves);

    this.validateCoordinateFormat(start);
    this.validateCoordinateValues(start);

    this.validateCoordinateFormat(exit);
    this.validateCoordinateValues(exit);

    this.validateMinesData(mines);
    mines.forEach(mine => {
      this.validateCoordinateValues(mine);
    });
  }

  /**
   * Starts the game simulation.
   *
   * @return {string} The game over message displayed on console.
   */
  simulateGame () {
    let currentLocation = this.start;
    let currentDirection = 'up';

    const gameResult = this.checkGameOver(currentLocation);
    if (gameResult.isGameOver) {
      return gameResult.message;
    }

    for (var i = 0; i < this.moves.length; i++) {
      if (this.moves[i] === 'move') {
        currentLocation = this.makeMove(currentLocation, currentDirection);
      } else {
        currentDirection = this.updateDirection(currentDirection);
      }

      const gameResult = this.checkGameOver(currentLocation);
      if (gameResult.isGameOver) {
        return gameResult.message;
      }

    }
    return 'Still in danger!';

  }

  /**
   * Checks if the current location ends the game.
   *
   * @param currentLocation - The currently occupied tile on the grid
   * @return {{isGameOver: boolean, message: string}} The object containing a boolean whether the game ends and the end message string.
   * @private
   */
  checkGameOver (currentLocation) {
    if (currentLocation.x === this.exit.x && currentLocation.y === this.exit.y) {
      return {
        isGameOver: true,
        message: 'Success!'
      };
    }
    if (this.isCurrentLocationOnMine(currentLocation)) {
      return {
        isGameOver: true,
        message: 'Mine hit!'
      };
    }
    return {
      isGameOver: false
    };
  }

  /**
   * Check if the current location hits a mine.
   *
   * @param currentLocation - The currently occupied tile on the grid
   * @return {boolean} True if the current location coordinate pair matches one of the mine coordinate pairs.
   * @private
   */
  isCurrentLocationOnMine (currentLocation) {
    for (let i = 0; i < this.mines.length; i++) {
      if (currentLocation.x === this.mines[i].x && currentLocation.y === this.mines[i].y) {
        return true;
      }
    }
  }

  /**
   * Chooses the movement type based on direction.
   *
   * @param currentLocation - The currently occupied tile on the grid
   * @param direction - The direction the character is facing
   * @return {{x: number, y: number}} Coordinates of the updated location.
   * @private
   */
  makeMove (currentLocation, direction) {
    let newLocation = currentLocation;
    switch (direction) {
      case 'up':
        this.moveUp(currentLocation, newLocation);
        break;
      case 'right':
        this.moveRight(currentLocation, newLocation);
        break;
      case 'down':
        this.moveDown(currentLocation, newLocation);
        break;
      case 'left':
        this.moveLeft(currentLocation, newLocation);
        break;
    }
    return newLocation;
  }

  /**
   * Makes a movement upwards, if there is room in the grid to move in the given direction.
   *
   * @param currentLocation - The currently occupied tile on the grid
   * @param newLocation - The updated location object after the movement is made
   * @private
   */
  moveUp (currentLocation, newLocation) {
    if (currentLocation.y !== 0) {
      newLocation.y = newLocation.y - 1;
    }
  }

  /**
   * Makes a movement to the right, if there is room in the grid to move in the given direction.
   *
   * @param currentLocation - The currently occupied tile on the grid
   * @param newLocation - The updated location object after the movement is made
   * @private
   */
  moveRight (currentLocation, newLocation) {
    if (currentLocation.x !== this.grid.w) {
      newLocation.x = newLocation.x + 1;
    }
  }

  /**
   * Makes a movement downwards, if there is room in the grid to move in the given direction.
   *
   * @param currentLocation - The currently occupied tile on the grid
   * @param newLocation - The updated location object after the movement is made
   * @private
   */
  moveDown (currentLocation, newLocation) {
    if (currentLocation.y !== this.grid.h) {
      newLocation.y = newLocation.y + 1;
    }
  }

  /**
   * Makes a movement to the left, if there is room in the grid to move in the given direction.
   *
   * @param currentLocation - The currently occupied tile on the grid
   * @param newLocation - The updated location object after the movement is made
   * @private
   */
  moveLeft (currentLocation, newLocation) {
    if (currentLocation.x !== 0) {
      newLocation.x = newLocation.x - 1;
    }
  }

  /**
   * Updates the direction of movement.
   *
   * @param currentDirection - The current direction of movement
   * @return {string} Returns the updated direction of movement.
   * @private
   */
  updateDirection (currentDirection) {
    switch (currentDirection) {
      case 'up':
        return 'right';
      case 'right':
        return 'down';
      case 'down':
        return 'left';
      case 'left':
        return 'up';
    }
  }

  /**
   * Validates the grid parameter.
   *
   * @param grid - An object containing the grid dimensions
   * @private
   */
  validateGridData (grid) {
    if (!grid || grid.constructor !== Object) {
      throw new Error('Invalid grid data. Expects an object with keys w and h.');
    }
  }

  /**
   * Validates the grid parameter values.
   *
   * @param grid - An object containing the grid dimensions
   * @private
   */
  validateGridDataValues (grid) {
    if (typeof grid.w !== 'number' || typeof grid.h !== 'number' || ( grid.w % 1 !== 0 ) || ( grid.h % 1 !== 0 ) ) {
      throw new Error('Invalid grid data. Expects grid object to have with w and h keys and whole number values.');
    }
  }

  /**
   * Validates the moves parameter.
   *
   * @param moves - Array of strings containing move actions
   * @private
   */
  validateMovesData (moves) {
    if (!moves || !Array.isArray(moves)) {
      throw new Error('Invalid moves data. Expects an array of strings "move" or "rotate".');
    }
  }

  /**
   * Validates values of the moves parameter.
   *
   * @param moves - Array of strings containing move actions
   * @private
   */
  validateMovesDataValues (moves) {
    moves.forEach(function (move) {
      if (typeof move !== 'string' || (move !== 'move' && move !== 'rotate')) {
        throw new Error('Invalid moves data. Expects an array of strings "move" or "rotate".');
      }
    });
  }

  /**
   * Validates the format of coordinates.
   *
   * @param coordinate - Object containing a pair of coordinates
   * @private
   */
  validateCoordinateFormat (coordinate) {
    if (!coordinate || coordinate.constructor !== Object) {
      throw new Error('Invalid coordinate data. Expects an object with x and y keys and whole number values.');
    }
  }

  /**
   * Validates values of a coordinate object.
   *
   * @param coordinate - Object containing a pair of coordinates
   * @private
   */
  validateCoordinateValues (coordinate) {
    if (typeof coordinate.x !== 'number' || typeof coordinate.y !== 'number' || ( coordinate.x % 1 !== 0 ) || ( coordinate.y % 1 !== 0 ) ) {
      throw new Error('Invalid coordinate data. Expects an object with x and y keys and whole number values.');
    }
  }

  /**
   * Validates the mines parameter.
   *
   * @param mines - Array of object containing ine coordinates
   * @private
   */
  validateMinesData (mines) {
    if (!mines || !Array.isArray(mines)) {
      throw new Error('Invalid mines data. Expects an array of objects with keys x and y and whole number values.');
    }
  }

}

exports = module.exports = TurtleChallengeGameSimulation;

