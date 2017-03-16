/**
 * This is a game simulation class that expects preset options to be passed as parameters.
 * Then it calculates whether or not the game will end in success or failure, and whether we reach the exit of the given grid area.
 * The game starts at the start coordinate, which marks the tile of the grid where movements are calculated from. The aim is to reach the
 * exit without hitting a tile with a mine on it. Possible outcomes are 'Mine hit!', 'Success' and 'Still in danger'.
 */
class TurtleChallengeGameSimulation {

  constructor (grid, moves, start, exit, mines) {
    this.grid = grid;
    this.moves = moves;
    this.start = start;
    this.exit = exit;
    this.mines = mines;
  }

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

  isCurrentLocationOnMine (currentLocation) {
    for (let i = 0; i < this.mines.length; i++) {
      if (currentLocation.x === this.mines[i].x && currentLocation.y === this.mines[i].y) {
        return true;
      }
    }
  }

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

  moveUp (currentLocation, newLocation) {
    if (currentLocation.y !== 0) {
      newLocation.y = newLocation.y - 1;
    }
  }

  /**
   *
   *
   * @param currentLocation
   * @param newLocation
   */
  moveRight (currentLocation, newLocation) {
    if (currentLocation.x !== this.grid.w) {
      newLocation.x = newLocation.x + 1;
    }
  }

  /**
   * Makes a movement downwards.
   *
   * @param currentLocation - The currently occupied tile on the grid.
   * @param newLocation - The updated location after the movement is made
   * @private
   */
  moveDown (currentLocation, newLocation) {
    if (currentLocation.y !== this.grid.h) {
      newLocation.y = newLocation.y + 1;
    }
  }

  /**
   * Makes a movement to the left.
   *
   * @param currentLocation - The currently occupied tile on the grid
   * @param newLocation - The updated location after the movement is made
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

}

/*
 What to test
 - grid gets whole numbers.
 - grid must have two coordinates
 - start must be within the grid
 - end must be within the grid
 - mines must be within the grid
 - mines can't be on same tile
 - moves format and content (array, string, move/rotate(or r) words)
 */

/*
 TODO
 - comment code
 - tests
 - readme
 - webkit szar
 - gitignore
 - package.json
 */

exports = module.exports = TurtleChallengeGameSimulation;

