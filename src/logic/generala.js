import { Random } from './random.js'

export default class Generala {
  constructor() {
    this.newGame()
  }

  status = {
    board: [],
    throws: 0,
    score: {},
    availableGames: {}
  }

  scoreGame = {
    stair: 25,
    full: 30,
    poker: 40,
    generala: 50,
    generala2: 100,
    served: 5
  }

  resetAvailableGames() {
    this.status.availableGames = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      stair: 0,
      full: 0,
      poker: 0,
      generala: 0,
      generala2: 0
    }
  }

  newGame() {
    this.status.board = [
      { value: 1, freeze: false },
      { value: 2, freeze: false },
      { value: 3, freeze: false },
      { value: 4, freeze: false },
      { value: 5, freeze: false },
    ]

    this.status.throws = 0

    this.status.score = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      stair: 0,
      full: 0,
      poker: 0,
      generala: 0,
      generala2: 0
    }

    this.resetAvailableGames()
  }

  getBoard() {
    return this.status.board
  }

  getStatus() {
    return this.status
  }

  mix(arr) {
    if (this.status.throws >= 3) return
    let arrayRandom = []
    if (arr) {
      arrayRandom = [...arr]
    } else {
      arrayRandom = Random({ from: 1, to: 6, qty: 5 })
    }

    arrayRandom.forEach((n, index) => {
      if (this.status.board[index].freeze) return
      this.status.board[index].value = n
    })

    this.status.throws++
    this.resetAvailableGames()
    this.checkGames()
  }

  freeze(arrIndex, unfreeze = false) {
    const bool = !unfreeze
    arrIndex.forEach((index) => {
      this.status.board[index].freeze = bool
    })
  }

  checkGames() {
    const results = this.status.availableGames
    const dices = this.status.board.map(item => item.value)
    const scoreGame = this.scoreGame
    const served = this.status.throws === 1 ? scoreGame.served : 0

    dices.sort()

    // números
    for (const num of dices) {
      results[num] += num
    }

    // generala
    if (dices.every(e => e === dices[0])) {
      if (this.status.score.generala > 0) {
        results.generala2 = scoreGame.generala2 + served
      } else {
        results.generala = scoreGame.generala + served
      }
    }

    // stair
    results.stair = function () {
      for (let i = 0; i < dices.length - 1; i++) {
        if (dices[i] !== dices[i + 1] - 1) {
          return 0
        }
      }
      return scoreGame.stair + served
    }()

    // full
    if (
      dices.slice(0, 3).every(e => e === dices[0]) &&
      dices[3] === dices[4] && dices[0] !== dices[3]
      ||
      dices.slice(2).every(e => e === dices[2]) &&
      dices[0] === dices[1] && dices[0] !== dices[2]
    ) results.full = scoreGame.full + served

    // poker
    results.poker = function () {
      for (let i = 1; i <= 6; i++) {
        const count = dices.filter(dice => dice === i).length
        if (count === 4) return scoreGame.poker + served
      }
      return 0
    }()
  }

  putScore(key) {
    this.status.score[key] = this.status.availableGames[key]
    this.resetAvailableGames()
  }
}
