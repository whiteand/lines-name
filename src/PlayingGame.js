import React from "react";
import { getBlocks, useMergeState } from "./utils";

function GameStatus({ currentPlayerId, players }) {
  const currentPlayer = players.find(player => player.id === currentPlayerId);
  if (!currentPlayer) return null;
  return (
    <div className="game-status">
      <h3 className="game-status_player-name-title">Current player:</h3>
      <div
        className="game-status_player-color"
        style={{ backgroundColor: currentPlayer.color }}
      />
      <h3 className="game-status_player-name">{currentPlayer.name}</h3>
    </div>
  );
}

function getTable({ blocks, players, nextMove }) {
  const height = blocks.length;
  const width = blocks[0].length;
  const tableWidth = width * 2 + 1;
  const tableHeight = height * 2 + 1;
  const getType = (row, col) => {
    if (row % 2 === 0 && col % 2 === 0) {
      return "space";
    }
    if (row % 2 === 0 && col % 2 === 1) {
      return "horizontal";
    }
    if (row % 2 === 1 && col % 2 === 0) {
      return "vertical";
    }
    return "block";
  };

  const getCell = (row, col) => {
    const type = getType(row, col);
    const cell = { type, row, col };
    const blockRow = Math.floor(row / 2);
    const blockCol = Math.floor(col / 2);
    if (type === "space") {
      return cell;
    }
    if (
      nextMove &&
      type === nextMove.type &&
      nextMove.row === blockRow &&
      nextMove.col === blockCol
    ) {
      cell.isNext = true;
    }
    if (type === "horizontal") {
      if (blockRow === blocks.length) {
        const block = blocks[blockRow - 1][blockCol];
        cell.playerId = block.bottom;
      } else {
        const block = blocks[blockRow][blockCol];
        cell.playerId = block.top;
      }
    }
    if (type === "vertical") {
      if (blockCol === blocks[0].length) {
        const block = blocks[blockRow][blockCol - 1];
        cell.playerId = block.right;
      } else {
        const block = blocks[blockRow][blockCol];
        cell.playerId = block.left;
      }
    }
    if (type === "block") {
      const block = blocks[blockRow][blockCol];
      cell.playerId = block.occupiedBy;
    }
    if (cell.playerId) {
      cell.color = players.find(p => p.id === cell.playerId).color;
    }
    return cell;
  };
  return Array.from({ length: tableHeight }, (row, rowInd) =>
    Array.from({ length: tableWidth }, (cell, colInd) =>
      getCell(rowInd, colInd)
    )
  );
}

function Board({
  horizontal,
  vertical,
  filledBlocks,
  players,
  onMove,
  currentPlayerId
}) {
  const [nextMove, setNextMove] = useMergeState(null);
  const blocks = getBlocks({ horizontal, vertical, filledBlocks, players });
  const table = getTable({ blocks, nextMove, players });
  const currentPlayer = players.find(p => p.id === currentPlayerId);

  const handleMove = nextMove => {
    if (!nextMove) return;
    if (nextMove.type === "horizontal") {
      if (horizontal[nextMove.row][nextMove.col]) return setNextMove(null);
    }
    if (nextMove.type === "vertical") {
      if (vertical[nextMove.row][nextMove.col]) return setNextMove(null);
    }
    onMove(nextMove);
    setNextMove(null);
  };

  const renderCell = cell => {
    if (cell.type === "space") {
      return <td className="cell space" key={`${cell.row}-${cell.col}`} />;
    }
    if (cell.type === "horizontal") {
      const getPossibleMove = () => ({
        type: "horizontal",
        row: Math.floor(cell.row / 2),
        col: Math.floor(cell.col / 2),
        playerId: currentPlayerId
      });
      const handleHorizontalMouseEnter = () => {
        console.log("hey");
        setNextMove(getPossibleMove());
      };
      const handleHorizontalClick = () => handleMove(getPossibleMove());
      const classes = [
        "cell",
        "horizontal",
        nextMove && cell.isNext ? "next-move" : "not-next-move",
        cell.playerId ? "occupied" : "not-occupied"
      ].join(" ");
      const style = cell.playerId
        ? {}
        : cell.isNext
        ? { backgroundColor: currentPlayer.color }
        : {};
      return (
        <td className={classes} style={style} key={`${cell.row}-${cell.col}`}>
          <div
            className="mouse-target horizontal"
            onMouseMove={handleHorizontalMouseEnter}
            onClick={handleHorizontalClick}
          />
        </td>
      );
    }
    if (cell.type === "vertical") {
      const getPossibleMove = () => ({
        type: "vertical",
        row: Math.floor(cell.row / 2),
        col: Math.floor(cell.col / 2),
        playerId: currentPlayerId
      });
      const handleVerticalMouseEnter = () => {
        setNextMove(getPossibleMove());
      };
      const handleVerticalClick = () => {
        handleMove(getPossibleMove());
      };
      const style = cell.playerId
        ? {}
        : cell.isNext
        ? { backgroundColor: currentPlayer.color }
        : {};
      const classes = [
        "cell",
        "vertical",
        cell.isNext ? "next-move" : "not-next-move",
        cell.playerId ? "occupied" : "not-occupied"
      ].join(" ");
      return (
        <td className={classes} style={style} key={`${cell.row}-${cell.col}`}>
          <div
            className="mouse-target vertical"
            onMouseEnter={handleVerticalMouseEnter}
            onClick={handleVerticalClick}
          />
        </td>
      );
    }
    const { color } = cell;
    return (
      <td
        className="cell block"
        style={color ? { backgroundColor: color } : {}}
        key={`${cell.row}-${cell.col}`}
      />
    );
  };

  return (
    <div className="board">
      <table className="board-table" onClick={() => handleMove(nextMove)}>
        <tbody>
          {table.map((row, rowInd) => (
            <tr
              className={rowInd % 2 === 0 ? "horizontals-row" : "blocks-row"}
              key={rowInd}
            >
              {row.map(renderCell)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MoveHistory({ moves }) {
  if (moves.length === 0) {
    return <h3>Make your first move!</h3>;
  }
  return <div className="moves-history">Move History</div>;
}

export default function PlayingGame({ game, onMove }) {
  if (!game) return null;
  return (
    <div className="playing-game-container">
      <GameStatus {...game} />
      <Board {...game} onMove={onMove} />
      <MoveHistory moves={game.moveHistory} />
    </div>
  );
}
