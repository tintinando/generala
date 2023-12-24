import { PropTypes } from 'prop-types'
import { useEffect } from 'react'
import { useState } from 'react'
import Modal from 'react-modal'

function StatusGame({ gameStatus, setFullScore }) {
  const [modalOpen, setModalOpen] = useState(false)

  const closeModal = () => {
    setModalOpen(false)
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
  }, [gameStatus, setFullScore])

  return (
    <>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        appElement={document.getElementById('app')}
      >
        <div className='container'>
          <p>Se completó la tabla</p>
          <button onClick={closeModal}>Cerrar</button>
        </div>
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
          </tbody>
        </table>
      </div>
    </>
  )
}

StatusGame.propTypes = {
  gameStatus: PropTypes.object,
  setFullScore: PropTypes.func
}

export default StatusGame
