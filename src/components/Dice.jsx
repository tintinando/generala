import * as dices from '../assets/dices/index'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

function Dice({ dice, onClick, freeze, shuffle, setShuffle, setDicesThrow }) {
  const [displayedDice, setDisplayedDice] = useState(1)
  const [transformValue, setTransformValue] = useState({ x: 0, y: 0, rot: 0 })

  useEffect(() => {
    // animation
    if (freeze || !shuffle) return

    setDicesThrow(false) // true when animation ends
    let animationCount = 0
    const interval = setInterval(() => {
      if (animationCount < 12) {
        const randomX = Math.floor(Math.random() * 10) - 5
        const randomY = Math.floor(Math.random() * 10) - 5
        const randomRot = Math.random() * 6 - 3

        setTransformValue({ x: randomX, y: randomY, rot: randomRot })
        setDisplayedDice(Math.floor(Math.random() * 6) + 1)
        animationCount++
      } else {
        clearInterval(interval)
        setDicesThrow(true)
        setShuffle(false)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [dice, shuffle, setShuffle, freeze, setDicesThrow])

  useEffect(() => {
    // final dice number
    if (!shuffle) {
      setDisplayedDice(dice)
    }
  }, [shuffle, dice])

  const diceNumber = `dice${displayedDice}`
  // random translate for each render animation
  const style = freeze
    ? {}
    : {
        transform: `translate(${transformValue.x}px, ${transformValue.y}px) 
    rotate(${transformValue.rot}deg)`
      }

  return (
    <img
      src={dices[diceNumber]}
      alt={`Dice-${displayedDice}`}
      style={style}
      onClick={onClick}
      className={freeze ? 'freeze' : ''}
    />
  )
}

Dice.propTypes = {
  dice: PropTypes.number,
  onClick: PropTypes.func,
  shuffle: PropTypes.bool,
  setShuffle: PropTypes.func,
  freeze: PropTypes.bool,
  setDicesThrow: PropTypes.func
}

export default Dice
