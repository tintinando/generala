import { useState } from 'react'
import './App.css'
import AvailableGames from './components/AvailableGames'
import DicesContainer from './components/DicesContainer'
import Navbar from './components/Navbar'
import StatusGame from './components/StatusGame'
import useGame from './components/hoks/useGame'

function App() {
  const { mixDices, newGame, freezeDice, putScore, gameStatus } = useGame()
  const [dicesThrow, setDicesThrow] = useState(false)

  return (
    <>
      <Navbar />
      <div className='container'>
        <div className='game-container'>
          <DicesContainer
            mixDices={mixDices}
            newGame={newGame}
            freezeDice={freezeDice}
            putScore={putScore}
            gameStatus={gameStatus}
            setDicesThrow={setDicesThrow}
          />
          <AvailableGames
            gameStatus={gameStatus}
            dicesThrow={dicesThrow}
          />
        </div>
        <StatusGame gameStatus={gameStatus} />
      </div>
    </>
  )
}

export default App
