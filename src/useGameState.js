import { useState } from 'react'
import { useMergeState } from './utils'
import { assocPath } from 'ramda'

const getMoveId = ({ type, row, col, playerId }) => `${type}-${row}-${col}-${playerId}`
const getWinner = () => null // TODO: write this
const getAffectedBlocks = () => [] // TODO: write this
const getNextPlayerId = ({ players, currentPlayerId }) => {
  return players[0].id // TODO: write this
}
export const useGameState = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [settings, setSettings] = useState({
    width: 10,
    height: 10,
    players: [
      { id: 1, color: '#f00', name: 'Player 1' },
      { id: 2, color: '#00f', name: 'Player 2' }
    ]
  })
  const [game, setGame] = useMergeState(null)
  
  const [gameResult, setGameResult] = useState(null)

  return {
    isPlaying,
    settings,
    setSettings,
    game,
    gameResult,
    startGame() {
      const { width, height, players } = settings
      setGame({
        width,
        height,
        players,
        horizontal: Array.from({ length: height + 1}, () => Array.from({ length: width }, () => null)),
        vertical: Array.from({ length: height }, () => Array.from({ length: width + 1 }, () => null)),
        filledBlocks: {},
        currentPlayerId: players[0].id,
        moveHistory: [],
      })
      setIsPlaying(true)
    },
    makeMove(move) {
      const { type, row, col, playerId} = move
      const moveId = getMoveId(move)
      const { horizontal, vertical, currentPlayerId, moveHistory } = game
      const newMoveHistory = [...moveHistory, { id: moveId, type, row, col, playerId }]

      const updatedBoard = assocPath([type, row, col], playerId, { horizontal, vertical })

      const winner = getWinner(updatedBoard)

      if (winner) {
        setIsPlaying(false)
        setGameResult({
          winner,
          moveHistory: newMoveHistory
        })
        setGame(null)
        setIsPlaying(false)
        return
      }

      const blocks = getAffectedBlocks({ horizontal, vertical, row, col})
      const isNewBlocksFilled = blocks.filter(block => block.isFilled).length > 0

      const nextPlayerId = isNewBlocksFilled ? currentPlayerId : getNextPlayerId(game)
      
      setGame({
        ...updatedBoard,
        nextPlayerId,
        moveHistory: newMoveHistory,
      })
    }
  }
}