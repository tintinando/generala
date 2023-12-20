import { useState, useRef } from 'react'
import Generala from '../../logic/generala'

function useGame() {
  const game = useRef(new Generala())
  const [gameStatus, setGameStatus] = useState(game.current.getStatus())

  const setStateFromLogic = () => {
    const logicStatus = game.current.getStatus()
    setGameStatus({
      ...logicStatus
    })
  }

  const mixDices = (arr) => {
    game.current.mix(arr)
    setStateFromLogic()
  }

  const newGame = () => {
    game.current.newGame()
    setStateFromLogic()
  }

  const freezeDice = (arrIndex, unfreeze) => {
    game.current.freeze(arrIndex, unfreeze)
    setStateFromLogic()
  }

  const putScore = (key) => {
    game.current.putScore(key)
    setStateFromLogic()
  }

  return {
    mixDices,
    newGame,
    freezeDice,
    putScore,
    gameStatus
  }
}

export default useGame
