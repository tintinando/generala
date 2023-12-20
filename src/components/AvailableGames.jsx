import PropTypes from 'prop-types'

function AvailableGames({ gameStatus, dicesThrow, putScore }) {
  const available = Object.keys(gameStatus.availableGames).filter((key) => {
    return gameStatus.score[key] === 0 && gameStatus.availableGames[key] !== 0
  })

  const handleSelectGame = (key) => {
    putScore(key)
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
            available.map((key) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{gameStatus.availableGames[key]}</td>
                <td>
                  <button onClick={() => handleSelectGame(key)}>Anotar</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

AvailableGames.propTypes = {
  gameStatus: PropTypes.object,
  dicesThrow: PropTypes.bool,
  putScore: PropTypes.func
}

export default AvailableGames
