const chai = require('chai');
const TurtleChallengeGameSimulation = require('../../../src/turtle-challenge-game-simulation/turtle-challenge-game-simulation');
const expect = chai.expect;

describe('TurtleChallengeGameSimulation', () => {

  describe('constructor', () => {

    describe('When grid is undefined', () => {
      it('should throw an error', () => {
        expect(() => {
          new TurtleChallengeGameSimulation(
              undefined,
              ['rotate', 'rotate', 'move', 'move', 'rotate', 'rotate', 'rotate', 'move', 'move', 'move', 'move'],
              { x: 1, y: 0 },
              { x: 3, y: 4 },
              [
                { x: 0, y: 0 },
                { x: 2, y: 0 },
                { x: 4, y: 4 }
              ]
          );
        }).to.throw('Invalid grid data. Expects an object with keys w and h.');
      });
    });
    describe('When grid is not an object', () => {
      it('should throw an error', () => {
        expect(() => {
          new TurtleChallengeGameSimulation(
              ['notAnObject'],
              ['rotate', 'rotate', 'move', 'move', 'rotate', 'rotate', 'rotate', 'move', 'move', 'move', 'move'],
              { x: 1, y: 0 },
              { x: 3, y: 4 },
              [
                { x: 0, y: 0 },
                { x: 2, y: 0 },
                { x: 4, y: 4 }
              ]
          );
        }).to.throw('Invalid grid data. Expects an object with keys w and h.');
      });
    });
    describe('When grid is an object but contains wrong keys', () => {
      it('should throw an error', () => {
        expect(() => {
          new TurtleChallengeGameSimulation(
              {
                notCorrectKey: 3,
                notCorrectKey2: 3
              },
              ['rotate', 'rotate', 'move', 'move', 'rotate', 'rotate', 'rotate', 'move', 'move', 'move', 'move'],
              { x: 1, y: 0 },
              { x: 3, y: 4 },
              [
                { x: 0, y: 0 },
                { x: 2, y: 0 },
                { x: 4, y: 4 }
              ]
          );
        }).to.throw('Invalid grid data. Expects grid object to have with w and h keys and whole number values.');
      });
    });
    describe('When grid is an object but w and h are not numbers', () => {
      it('should throw an error', () => {
        expect(() => {
          new TurtleChallengeGameSimulation(
              {
                w: 'notANumber',
                h: ['notANumber']
              },
              ['rotate', 'rotate', 'move', 'move', 'rotate', 'rotate', 'rotate', 'move', 'move', 'move', 'move'],
              { x: 1, y: 0 },
              { x: 3, y: 4 },
              [
                { x: 0, y: 0 },
                { x: 2, y: 0 },
                { x: 4, y: 4 }
              ]
          );
        }).to.throw('Invalid grid data. Expects grid object to have with w and h keys and whole number values.');
      });
    });
    describe('When grid is an object but w and h are not whole numbers', () => {
      it('should throw an error', () => {
        expect(() => {
          new TurtleChallengeGameSimulation(
              {
                w: 5.4,
                h: 5.2
              },
              ['rotate', 'rotate', 'move', 'move', 'rotate', 'rotate', 'rotate', 'move', 'move', 'move', 'move'],
              { x: 1, y: 0 },
              { x: 3, y: 4 },
              [
                { x: 0, y: 0 },
                { x: 2, y: 0 },
                { x: 4, y: 4 }
              ]
          );
        }).to.throw('Invalid grid data. Expects grid object to have with w and h keys and whole number values.');
      });
    });

    describe('When moves is undefined', () => {
      it('should throw an error', () => {
        expect(() => {
          new TurtleChallengeGameSimulation(
              {
                w: 5,
                h: 5
              },
              undefined,
              { x: 1, y: 0 },
              { x: 3, y: 4 },
              [
                { x: 0, y: 0 },
                { x: 2, y: 0 },
                { x: 4, y: 4 }
              ]
          );
        }).to.throw('Invalid moves data. Expects an array of strings "move" or "rotate".');
      });
    });
    describe('When moves is not an array', () => {
      it('should throw an error', () => {
        expect(() => {
          new TurtleChallengeGameSimulation(
              {
                w: 5,
                h: 5
              },
              { notAn: 'array' },
              { x: 1, y: 0 },
              { x: 3, y: 4 },
              [
                { x: 0, y: 0 },
                { x: 2, y: 0 },
                { x: 4, y: 4 }
              ]
          );
        }).to.throw('Invalid moves data. Expects an array of strings "move" or "rotate".');
      });
    });
    describe('When moves is an array but have items other than strings', () => {
      it('should throw an error', () => {
        expect(() => {
          new TurtleChallengeGameSimulation(
              {
                w: 5,
                h: 5
              },
              [{ notA: 'string' }],
              { x: 1, y: 0 },
              { x: 3, y: 4 },
              [
                { x: 0, y: 0 },
                { x: 2, y: 0 },
                { x: 4, y: 4 }
              ]
          );
        }).to.throw('Invalid moves data. Expects an array of strings "move" or "rotate".');
      });
    });
    describe('When moves is an array of strings other than "move" or "rotate"', () => {
      it('should throw an error', () => {
        expect(() => {
          new TurtleChallengeGameSimulation(
              {
                w: 5,
                h: 5
              },
              ['wrongString', 'wrongString2'],
              { x: 1, y: 0 },
              { x: 3, y: 4 },
              [
                { x: 0, y: 0 },
                { x: 2, y: 0 },
                { x: 4, y: 4 }
              ]
          );
        }).to.throw('Invalid moves data. Expects an array of strings "move" or "rotate".');
      });
    });

    describe('When start is undefined', () => {
      it('should throw an error', () => {
        expect(() => {
          new TurtleChallengeGameSimulation(
              {
                w: 5,
                h: 5
              },
              ['move', 'rotate'],
              undefined,
              { x: 3, y: 4 },
              [
                { x: 0, y: 0 },
                { x: 2, y: 0 },
                { x: 4, y: 4 }
              ]
          );
        }).to.throw('Invalid coordinate data. Expects an object with x and y keys and whole number values.');
      });
    });
    describe('When start is not an object', () => {
      it('should throw an error', () => {
        expect(() => {
          new TurtleChallengeGameSimulation(
              {
                w: 5,
                h: 5
              },
              ['move', 'rotate'],
              ['notAnObject'],
              { x: 3, y: 4 },
              [
                { x: 0, y: 0 },
                { x: 2, y: 0 },
                { x: 4, y: 4 }
              ]
          );
        }).to.throw('Invalid coordinate data. Expects an object with x and y keys and whole number values.');
      });
    });
    describe('When start is an object but contains wrong keys', () => {
      it('should throw an error', () => {
        expect(() => {
          new TurtleChallengeGameSimulation(
              {
                w: 5,
                h: 5
              },
              ['move', 'rotate'],
              {
                notCorrectKey: 1,
                notCorrectKey2: 0
              },
              { x: 3, y: 4 },
              [
                { x: 0, y: 0 },
                { x: 2, y: 0 },
                { x: 4, y: 4 }
              ]
          );
        }).to.throw('Invalid coordinate data. Expects an object with x and y keys and whole number values.');
      });
    });
    describe('When start is an object but x and y are not numbers', () => {
      it('should throw an error', () => {
        expect(() => {
          new TurtleChallengeGameSimulation(
              {
                w: 5,
                h: 5
              },
              ['move', 'rotate'],
              {
                x: 'notANumber',
                y: ['notANumber']
              },
              { x: 3, y: 4 },
              [
                { x: 0, y: 0 },
                { x: 2, y: 0 },
                { x: 4, y: 4 }
              ]
          );
        }).to.throw('Invalid coordinate data. Expects an object with x and y keys and whole number values.');
      });
    });
    describe('When start is an object but x and y are not whole numbers', () => {
      it('should throw an error', () => {
        expect(() => {
          new TurtleChallengeGameSimulation(
              {
                w: 5,
                h: 5
              },
              ['move', 'rotate'],
              {
                x: 0.1,
                y: 1.2
              },
              { x: 3, y: 4 },
              [
                { x: 0, y: 0 },
                { x: 2, y: 0 },
                { x: 4, y: 4 }
              ]
          );
        }).to.throw('Invalid coordinate data. Expects an object with x and y keys and whole number values.');
      });
    });

    describe('When exit is undefined', () => {
      it('should throw an error', () => {
        expect(() => {
          new TurtleChallengeGameSimulation(
              {
                w: 5,
                h: 5
              },
              ['move', 'rotate'],
              { x: 1, y: 0 },
              undefined,
              [
                { x: 0, y: 0 },
                { x: 2, y: 0 },
                { x: 4, y: 4 }
              ]
          );
        }).to.throw('Invalid coordinate data. Expects an object with x and y keys and whole number values.');
      });
    });
    describe('When exit is not an object', () => {
      it('should throw an error', () => {
        expect(() => {
          new TurtleChallengeGameSimulation(
              {
                w: 5,
                h: 5
              },
              ['move', 'rotate'],
              { x: 1, y: 0 },
              ['notAnObject'],
              [
                { x: 0, y: 0 },
                { x: 2, y: 0 },
                { x: 4, y: 4 }
              ]
          );
        }).to.throw('Invalid coordinate data. Expects an object with x and y keys and whole number values.');
      });
    });
    describe('When exit is an object but contains wrong keys', () => {
      it('should throw an error', () => {
        expect(() => {
          new TurtleChallengeGameSimulation(
              {
                w: 5,
                h: 5
              },
              ['move', 'rotate'],
              { x: 1, y: 0 },
              {
                notCorrectKey: 1,
                notCorrectKey2: 0
              },
              [
                { x: 0, y: 0 },
                { x: 2, y: 0 },
                { x: 4, y: 4 }
              ]
          );
        }).to.throw('Invalid coordinate data. Expects an object with x and y keys and whole number values.');
      });
    });
    describe('When exit is an object but x and y are not numbers', () => {
      it('should throw an error', () => {
        expect(() => {
          new TurtleChallengeGameSimulation(
              {
                w: 5,
                h: 5
              },
              ['move', 'rotate'],
              { x: 1, y: 0 },
              {
                x: 'notANumber',
                y: ['notANumber']
              },
              [
                { x: 0, y: 0 },
                { x: 2, y: 0 },
                { x: 4, y: 4 }
              ]
          );
        }).to.throw('Invalid coordinate data. Expects an object with x and y keys and whole number values.');
      });
    });
    describe('When exit is an object but x and y are not whole numbers', () => {
      it('should throw an error', () => {
        expect(() => {
          new TurtleChallengeGameSimulation(
              {
                w: 5,
                h: 5
              },
              ['move', 'rotate'],
              { x: 1, y: 0 },
              {
                x: 0.1,
                y: 1.2
              },
              [
                { x: 0, y: 0 },
                { x: 2, y: 0 },
                { x: 4, y: 4 }
              ]
          );
        }).to.throw('Invalid coordinate data. Expects an object with x and y keys and whole number values.');
      });
    });

    describe('When mines is undefined', () => {
      it('should throw an error', () => {
        expect(() => {
          new TurtleChallengeGameSimulation(
              {
                w: 5,
                h: 5
              },
              ['move', 'rotate'],
              { x: 1, y: 0 },
              { x: 3, y: 4 },
              undefined
          );
        }).to.throw('Invalid mines data. Expects an array of objects with keys x and y and whole number values.');
      });
    });
    describe('When mines is not an array', () => {
      it('should throw an error', () => {
        expect(() => {
          new TurtleChallengeGameSimulation(
              {
                w: 5,
                h: 5
              },
              ['move', 'rotate'],
              { x: 1, y: 0 },
              { x: 3, y: 4 },
              { notAn: 'array' }
          );
        }).to.throw('Invalid mines data. Expects an array of objects with keys x and y and whole number values.');
      });
    });
    describe('When mines is an array but have items other than objects', () => {
      it('should throw an error', () => {
        expect(() => {
          new TurtleChallengeGameSimulation(
              {
                w: 5,
                h: 5
              },
              ['move', 'rotate'],
              { x: 1, y: 0 },
              { x: 3, y: 4 },
              [
                'notAnObject'
              ]
          );
        }).to.throw('Invalid coordinate data. Expects an object with x and y keys and whole number values.');
      });
    });
    describe('When mines is an array of objects but contains wrong keys', () => {
      it('should throw an error', () => {
        expect(() => {
          new TurtleChallengeGameSimulation(
              {
                w: 5,
                h: 5
              },
              ['move', 'rotate'],
              { x: 1, y: 0 },
              { x: 3, y: 4 },
              [
                { wrongKey: 0, wrongKey2: 0 },
                { wrongKey: 2, wrongKey2: 0 },
                { wrongKey: 4, wrongKey2: 4 }
              ]
          );
        }).to.throw('Invalid coordinate data. Expects an object with x and y keys and whole number values.');
      });
    });
    describe('When mines is an array of objects but x and y are not numbers', () => {
      it('should throw an error', () => {
        expect(() => {
          new TurtleChallengeGameSimulation(
              {
                w: 5,
                h: 5
              },
              ['move', 'rotate'],
              { x: 1, y: 0 },
              { x: 3, y: 4 },
              [
                { x: 'notANumber', y: 'notANumber' },
                { x: 'notANumber', y: 'notANumber' },
                { x: 'notANumber', y: 'notANumber' }
              ]
          );
        }).to.throw('Invalid coordinate data. Expects an object with x and y keys and whole number values.');
      });
    });
    describe('When mines is an array of objects but x and y are not whole numbers', () => {
      it('should throw an error', () => {
        expect(() => {
          new TurtleChallengeGameSimulation(
              {
                w: 5,
                h: 5
              },
              ['move', 'rotate'],
              { x: 1, y: 0 },
              { x: 3, y: 4 },
              [
                { x: 2.3, y: 1.4 },
                { x: 3.5, y: 3.4 },
                { x: 1.3, y: 2.5 }
              ]
          );
        }).to.throw('Invalid coordinate data. Expects an object with x and y keys and whole number values.');
      });
    });

  });

  describe('simulateGame', () => {

    describe('When simulation cannot access the exit but does not hit a mine either', () => {
      let simulate;

      beforeEach(() => {
        simulate = new TurtleChallengeGameSimulation(
            {
              w: 5,
              h: 5
            },
            ['rotate', 'rotate', 'move', 'rotate', 'rotate', 'rotate', 'move'],
            { x: 1, y: 0 },
            { x: 3, y: 4 },
            [
              { x: 0, y: 0 },
              { x: 2, y: 0 },
              { x: 4, y: 4 },
              { x: 2, y: 3 },
              { x: 4, y: 2 },
              { x: 1, y: 2 },
              { x: 1, y: 4 }
            ]
        );
      });

      it('should return the string "Still in danger!"', () => {
        const result = simulate.simulateGame();
        expect(result).to.equal('Still in danger!');
      });
    });
    describe('When simulation hits a mine', () => {
      let simulate;

      beforeEach(() => {
        simulate = new TurtleChallengeGameSimulation(
            {
              w: 5,
              h: 5
            },
            ['rotate', 'rotate', 'move', 'move'],
            { x: 1, y: 0 },
            { x: 3, y: 4 },
            [
              { x: 0, y: 0 },
              { x: 2, y: 0 },
              { x: 4, y: 4 },
              { x: 2, y: 3 },
              { x: 4, y: 2 },
              { x: 1, y: 2 },
              { x: 1, y: 4 }
            ]
        );
      });

      it('should return the string "Mine hit!"', () => {
        const result = simulate.simulateGame();
        expect(result).to.equal('Mine hit!');
      });
    });
    describe('When simulation exits the grid', () => {
      let simulate;

      beforeEach(() => {
        simulate = new TurtleChallengeGameSimulation(
            {
              w: 5,
              h: 5
            },
            ['rotate', 'rotate', 'move', 'rotate', 'rotate', 'rotate', 'move', 'move', 'rotate', 'move', 'move', 'move'],
            { x: 1, y: 0 },
            { x: 3, y: 4 },
            [
              { x: 0, y: 0 },
              { x: 2, y: 0 },
              { x: 4, y: 4 },
              { x: 2, y: 3 },
              { x: 4, y: 2 },
              { x: 1, y: 2 },
              { x: 1, y: 4 }
            ]
        );
      });

      it('should return the string "Success!"', () => {
        const result = simulate.simulateGame();
        expect(result).to.equal('Success!');
      });
    });

  });

});