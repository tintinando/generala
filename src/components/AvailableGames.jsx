import PropTypes from 'prop-types'

function AvailableGames({ gameStatus, dicesThrow }) {
  return (
    <div className='container'>
      <table className='table-available'>
        <thead>
          <tr>
            <th>Juego</th>
            <th>Puntaje</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(gameStatus.availableGames).map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{dicesThrow && gameStatus.availableGames[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

AvailableGames.propTypes = {
  gameStatus: PropTypes.object,
  dicesThrow: PropTypes.bool
}

export default AvailableGames
