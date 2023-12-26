import { PropTypes } from 'prop-types'
import { useEffect } from 'react'
import { useState } from 'react'
import Modal from 'react-modal'

function StatusGame({ gameStatus, setFullScore, setDicesThrow }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [totalScore, setTotalScore] = useState(0)

  const closeModal = () => {
    setModalOpen(false)
    setDicesThrow(false)
  }

  const modalStyle = {
    overlay: {
      backgroundColor: 'transparent'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#3a4be2',
      color: '#ccc'
    }
  }

  useEffect(() => {
    if (Object.keys(gameStatus.score).every((e) => gameStatus.score[e] !== 0)) {
      setFullScore(true)
      setModalOpen(true)
    }

    const suma = Object.values(gameStatus.score).reduce((total, valor) => {
      if (typeof valor === 'number') return total + valor
      return total
    }, 0)
    setTotalScore(suma)
  }, [gameStatus, setFullScore])

  return (
    <>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        appElement={document.getElementById('app')}
      >
        <ul className='container'>
          <li>Se completó la tabla</li>
          <li>Total de puntos: {totalScore}</li>
          <li>Puntuación máxima: 350</li>
          <li>Rendimiento {`${Math.floor((totalScore * 100) / 35) / 10} %`}</li>
        </ul>
        <button onClick={closeModal}>Cerrar</button>
      </Modal>

      <div className='container'>
        <table className='table-status'>
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
            <tfoot>
              <tr>
                <th>Total:</th>
                <th>{totalScore}</th>
              </tr>
            </tfoot>
          </tbody>
        </table>
      </div>
    </>
  )
}

StatusGame.propTypes = {
  gameStatus: PropTypes.object,
  setFullScore: PropTypes.func,
  setDicesThrow: PropTypes.func
}

export default StatusGame
