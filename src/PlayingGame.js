import React from 'react'

function GameStatus({ currentPlayerId, players }) {
  const currentPlayer = players.find(player => player.id === currentPlayerId)
  if (!currentPlayer) return null
  return (
    <div className="game-status">
      <h3 className="game-status_player-name-title">Current player:</h3>
      <div className="game-status_player-color" style={{ backgroundColor: currentPlayer.color }} />
      <h3 className="game-status_player-name">{currentPlayer.name}</h3>
    </div>
  )

}

const getBlocks = ({ horizontal, vertical, filledBlocks }) => []
function Board({ horizontal, vertical }) {
  return <div>Game field</div>
}

function MoveHistory({moves}) {
  if (moves.length === 0) {
    return <h3>Make your first move!</h3>
  }
  return <div className="moves-history">Move History</div>
}

export default function PlayingGame({ game }) {
  if (!game) return null
  return (
    <div className="playing-game-container">
      <GameStatus {...game} />
      <Board {...game} />
      <MoveHistory moves={game.moveHistory} />
    </div>
  )
} 