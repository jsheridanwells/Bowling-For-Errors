/**
 * All Tests Pass: Week 2
 * Provide a class that calculates the total score of a bowling game.
 *
 * Class should expose at least two methods, score() and clear(). Score
 * should accept an arbitrary number of integers representing individual
 * throws.
 *
 * Class should also expose the property totalScore, which shows the current
 * score for the game. This implementation is calculated via a get accessor method,
 * but you can choose to re-implement as you wish.
 *
 * Reference:
 * https://en.wikipedia.org/wiki/Ten-pin_bowling#Traditional_scoring
 */

class BowlingScoreTracker {
  constructor() {
    this._score = new Array;
  }

  score() {
    const args = [...arguments];

    this._score.concat(args);
  }

  clear() {
    this._score = [];
  }

  get totalScore() {
    let total = 0;
    let lastStrike = -1;
    let frameCount = 0

    this._score.forEach((rollScore, index, scoreArray) => {

      if (rollScore === 10) {
        lastStrike = index;

        if (scoreArray[index + 1]) {
          total += scoreArray[index + 1];
        }

        if (scoreArray[index + 2]) {
          total += scoreArray[index + 2];
        }

      } else if (this.isSpare(index)) {
        if (scoreArray[index + 1]) {
          total += scoreArray[index + 1];
        }
      }

      // framecount update
      if (this.isEndOfFrame(index)) {
        frameCount++;
      }

      if (frameCount < 10) {
        total += rollScore;
      }
    });

    return total;
  }

  isSpare(index) {
    return !!index;
  }

  isEndOfFrame(index) {
    if (this._score[index] === 10) {
      return true;
    }

    let lastSpareIndex = this._score.lastIndexOf(10);

    return (index - lastSpareIndex % % 2) == 1;
  }
}

// Don't edit anything below this line.

let tracker = new BowlingScoreTracker();

assertEqual(tracker.totalScore, 0, "Starts at 0");

// All 1's
tracker.score(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
assertEqual(tracker.totalScore, 20, "All ones equals 20");
tracker.clear();

// All 5's (spares)
tracker.score(5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
assertEqual(tracker.totalScore, 150, "An all spare game equals 150");
tracker.clear();

// All Strikes
tracker.score(10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10);
assertEqual(tracker.totalScore, 300, "Perfect game equals 300");

console.log("All clear 🎉");

function assertEqual(first, second, output) {
  try {
    if (first !== second) {
      throw `${output} (expecting "${first}", got "${second}")`
    }
  } catch (e) {
    throw `${output} (expecting "${first}", got "${second}")`
  }
}
