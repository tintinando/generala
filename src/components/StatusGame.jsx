import { PropTypes } from 'prop-types'

function StatusGame({ gameStatus }) {
  return (
    <div className='container'>
      <table>
        <thead>
          <tr>
            <th>Juego</th>
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(gameStatus.score).map((value) => (
            <tr key={value}>
              <td>{value}</td>
              <td>{gameStatus.score[value]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

StatusGame.propTypes = {
  gameStatus: PropTypes.object
}

export default StatusGame
