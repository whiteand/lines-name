import { useState } from "react";
import { useMergeState } from "./utils";
import { assocPath } from "ramda";

const getMoveId = ({ type, row, col, playerId }) =>
  `${type}-${row}-${col}-${playerId}`;
const getWinner = () => null; // TODO: write this
const getAffectedBlocks = ({ type, row, col, horizontal, vertical }) => {
  const res = []
  if (type === 'horizontal') {
    if (row > 0) {
      const topBlock = {
        top: horizontal[row-1][col],
        bottom: horizontal[row][col],
        left: horizontal[row-1][col],
        right: horizontal[row-1][col+1]
      }
      topBlock.isFilled = Object.values(topBlock).every(Boolean)

      res.push(topBlock)
    }
  }
  return res.filter(Boolean)
}; // TODO: write this
const getNextPlayerId = ({ players, currentPlayerId }) => {
  const prevIndex = players.findIndex(p => p.id === currentPlayerId)
  const nextIndex = prevIndex >= 0 ? ((prevIndex + 1) % players.length) : 0
  const nextId = players[nextIndex].id
  return nextId
};
export const useGameState = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [settings, setSettings] = useState({
    width: 10,
    height: 10,
    players: [
      { id: 1, color: "#f00", name: "Player 1" },
      { id: 2, color: "#00f", name: "Player 2" }
    ]
  });
  const [game, setGame] = useMergeState(null);

  const [gameResult, setGameResult] = useState(null);

  return {
    isPlaying,
    settings,
    setSettings,
    game,
    gameResult,
    startGame() {
      const { width, height, players } = settings;
      setGame({
        width,
        height,
        players,
        horizontal: Array.from({ length: height + 1 }, () =>
          Array.from({ length: width }, () => null)
        ),
        vertical: Array.from({ length: height }, () =>
          Array.from({ length: width + 1 }, () => null)
        ),
        filledBlocks: {},
        currentPlayerId: players[0].id,
        moveHistory: []
      });
      setIsPlaying(true);
    },
    makeMove(move) {
      const { type, row, col, playerId } = move;
      const moveId = getMoveId(move);
      const { horizontal, vertical, currentPlayerId, moveHistory } = game;
      const newMoveHistory = [
        ...moveHistory,
        { id: moveId, type, row, col, playerId }
      ];

      const updatedBoard = assocPath([type, row, col], playerId, {
        horizontal,
        vertical
      });

      const winner = getWinner(updatedBoard);

      if (winner) {
        setIsPlaying(false);
        setGameResult({
          winner,
          moveHistory: newMoveHistory
        });
        setGame(null);
        setIsPlaying(false);
        return;
      }

      const blocks = getAffectedBlocks({ ...updatedBoard, row, col, type });
      const isNewBlocksFilled =
        blocks.filter(block => block.isFilled).length > 0;

      const nextPlayerId = isNewBlocksFilled
        ? currentPlayerId
        : getNextPlayerId(game);

      setGame({
        ...updatedBoard,
        currentPlayerId: nextPlayerId,
        moveHistory: newMoveHistory
      });
    }
  };
};
