import PropTypes from 'prop-types'

function AvailableGames({ gameStatus, dicesThrow, setDicesThrow, putScore }) {
  const available = Object.keys(gameStatus.availableGames).filter((key) => {
    return gameStatus.score[key] === 0 && gameStatus.availableGames[key] !== 0
  })

  const cancellable = Object.keys(gameStatus.availableGames).filter((key) => {
    return gameStatus.score[key] === 0 && gameStatus.availableGames[key] === 0
  })

  const handleSelectGame = (key) => {
    putScore(key)
    setDicesThrow(false)
  }

  const handleCancelGame = (key) => {
    putScore(key, true)
    setDicesThrow(false)
  }

  return (
    <div className='container'>
      <table className='table-available'>
        <thead>
          <tr>
            <th colSpan={3}>
              Tiros totales: {dicesThrow && gameStatus.throws}
            </th>
          </tr>
          <tr>
            <th>Juego</th>
            <th>Puntaje</th>
          </tr>
        </thead>
        <tbody>
          {dicesThrow &&
            (available.length > 0
              ? available.map((key) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{gameStatus.availableGames[key]}</td>
                    <td>
                      <button onClick={() => handleSelectGame(key)}>
                        Anotar
                      </button>
                    </td>
                  </tr>
                ))
              : cancellable.map((key) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{gameStatus.availableGames[key]}</td>
                    <td>
                      <button onClick={() => handleCancelGame(key)}>
                        Tachar
                      </button>
                    </td>
                  </tr>
                )))}
        </tbody>
      </table>
    </div>
  )
}

AvailableGames.propTypes = {
  gameStatus: PropTypes.object,
  dicesThrow: PropTypes.bool,
  setDicesThrow: PropTypes.func,
  putScore: PropTypes.func
}

export default AvailableGames
