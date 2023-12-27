import { useRef } from 'react'
import Generala from '../../logic/generala'
import useLocalStorage from './useLocalStorage'

function useGame() {
  const game = useRef(new Generala())
  const [gameStatus, setGameStatus] = useLocalStorage(
    'gameStatus',
    game.current.getStatus(),
    600
  )

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

  const putScore = (key, cancel) => {
    game.current.putScore(key, cancel)
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
