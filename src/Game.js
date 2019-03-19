import React from "react";
import Settings from "./Settings";
import { log } from "./utils";
import { useGameState } from "./useGameState";
import PlayingGame from './PlayingGame'

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
    <PlayingGame game={game} />
  ) : (
    <Settings
      settings={settings}
      onChange={setSettings}
      onPlay={startGame}
      onMove={makeMove}
    />
  );
}
