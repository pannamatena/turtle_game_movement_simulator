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

  moveRight (currentLocation, newLocation) {
    if (currentLocation.x !== this.grid.w) {
      newLocation.x = newLocation.x + 1;
    }
  }

  moveDown (currentLocation, newLocation) {
    if (currentLocation.y !== this.grid.h) {
      newLocation.y = newLocation.y + 1;
    }
  }

  moveLeft (currentLocation, newLocation) {
    if (currentLocation.x !== 0) {
      newLocation.x = newLocation.x - 1;
    }
  }

  /**
   * Updates the direction of movement.
   *
   * @param currentDirection - The current direction of movement.
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

exports = module.exports = TurtleChallengeGameSimulation;

