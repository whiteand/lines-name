import React from "react";
import Settings from "./Settings";
import { log } from "./utils";
import { useGameState } from "./useGameState";
export default function Game() {
  const gameState = useGameState();
  const {
    isPlaying,
    settings,
    setSettings,
    game,
    startGame,
    makeMove = log("gameState.makeMove")
  } = gameState;

  return isPlaying ? (
    game ? (
      <Game game={game} />
    ) : null
  ) : (
    <Settings
      settings={settings}
      onChange={setSettings}
      onPlay={startGame}
      onMove={makeMove}
    />
  );
}
