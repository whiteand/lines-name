import React, { Fragment } from "react";
import Settings from "./Settings";
import { useGameState } from "./useGameState";
export default function Game() {
  const gameState = useGameState();
  const { isPlaying, width, height, players, setIsPlaying, setSettings } = gameState
  const startGame = () => setIsPlaying(true)

  return isPlaying ? (
    <div>
      <div>
        {JSON.stringify(gameState, null, 2)}
      </div>
      <h3>Game</h3>
    </div>
  ) : (
    <Fragment>
      <div>
        {JSON.stringify(gameState, null, 2)}
      </div>
      <Settings width={width} height={height} players={players} onChange={setSettings} onPlay={startGame}/>
    </Fragment>
  );
}
