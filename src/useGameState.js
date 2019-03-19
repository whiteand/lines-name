import { useState } from "react";
import { useMergeState, getBlockId } from "./utils";
import { assocPath } from "ramda";

const getMoveId = ({ type, row, col, playerId }) =>
  `${type}-${row}-${col}-${playerId}`;
const getWinner = () => null; // TODO: write this
const getAffectedBlocks = ({ type, row, col, horizontal, vertical }) => {
  const res = []
  if (type === 'horizontal') {
    if (row > 0) {
      res.push({
        top: horizontal[row-1][col],
        bottom: horizontal[row][col],
        left: vertical[row-1][col],
        right: vertical[row-1][col+1],
        row: row-1,
        col: col
      })
    }
    if (row < horizontal.length-1) {
      res.push({
        top: horizontal[row][col],
        bottom: horizontal[row+1][col],
        left: vertical[row][col],
        right: vertical[row][col+1],
        row,
        col
      })
    }
  } else if (type === 'vertical') {
    if (col > 0) {
      res.push({
        right: vertical[row][col],
        left: vertical[row][col-1],
        top: horizontal[row][col-1],
        bottom: horizontal[row+1][col-1],
        row: row,
        col: col - 1
      })
    }
    if (col < vertical[row].length-1) {
      res.push({
        right: vertical[row][col+1],
        left: vertical[row][col],
        top: horizontal[row][col],
        bottom: horizontal[row+1][col],
        row: row,
        col: col
      })
    }
  }
  const affectedBlocks = res.map(block => ({...block, isFilled: Object.values(block).every(Boolean)}))
  return affectedBlocks
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
      const { type, row, col } = move;
      const moveId = getMoveId(move);
      const { horizontal, vertical, currentPlayerId, moveHistory, filledBlocks } = game;
      const newMoveHistory = [
        ...moveHistory,
        { id: moveId, type, row, col, playerId: currentPlayerId }
      ];

      const updatedBoard = assocPath([type, row, col], currentPlayerId, {
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
        filledBlocks: {
          ...filledBlocks,
          ...blocks.filter(b => b.isFilled).reduce((dict, block) => {
            const id = getBlockId(block.row, block.col)
            dict[id] = currentPlayerId
            return dict
          }, {})
        },
        currentPlayerId: nextPlayerId,
        moveHistory: newMoveHistory
      });
    }
  };
};
