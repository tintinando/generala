import { useState } from 'react'
import Dice from './Dice'
import PropTypes from 'prop-types'

function DicesContainer({
  mixDices,
  newGame,
  freezeDice,
  gameStatus,
  setDicesThrow,
  fullScore
}) {
  const [shuffle, setShuffle] = useState(false)

  const handleShuffle = () => {
    setShuffle(true)
    mixDices()
  }

  const handleNewGame = () => {
    setShuffle((prev) => !prev)
    newGame()
  }

  const handleDiceClick = (index) => {
    if (gameStatus.board[index].freeze) {
      freezeDice([index], true)
    } else {
      freezeDice([index], false)
    }
  }

  return (
    <div className='container'>
      <div className='dices-container'>
        {gameStatus.throws > 0 ? (
          gameStatus.board.map((e, index) => (
            <Dice
              key={index}
              dice={e.value}
              onClick={() => handleDiceClick(index)}
              shuffle={shuffle}
              setShuffle={setShuffle}
              freeze={e.freeze}
              setDicesThrow={setDicesThrow}
            />
          ))
        ) : (
          <h3>Pulse &quot;Repartir&quot;</h3>
        )}
      </div>
      <div>
        <button
          onClick={handleShuffle}
          disabled={gameStatus.throws >= 3 || fullScore}
        >
          Repartir
        </button>
        <button onClick={handleNewGame}>Reiniciar</button>
      </div>
    </div>
  )
}

DicesContainer.propTypes = {
  mixDices: PropTypes.func,
  newGame: PropTypes.func,
  freezeDice: PropTypes.func,
  putScore: PropTypes.func,
  gameStatus: PropTypes.object,
  setDicesThrow: PropTypes.func,
  fullScore: PropTypes.bool
}

export default DicesContainer
