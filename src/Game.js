import React from "react";
import Settings from "./Settings";
import { useGameState } from "./useGameState";
import PlayingGame from './PlayingGame'

export default function Game() {
  const {
    isPlaying,
    settings,
    setSettings,
    game,
    startGame,
    makeMove
  } = useGameState();

  return isPlaying ? (
    <PlayingGame game={game} onMove={makeMove}/>
  ) : (
    <Settings
      settings={settings}
      onChange={setSettings}
      onPlay={startGame}
      onMove={makeMove}
    />
  );
}
