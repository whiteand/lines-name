import React from "react";
import { log } from "./utils";
import NewPlayerForm from './NewPlayerForm';
export default function SettingsPlayersList({
  players = [],
  onAdd = log("PlayersList.onAdd"),
  onRemove = log("PlayersList.onRemove")
}) {
  const renderPlayer = player => (
    <div className="player-container" key={player.id}>
      <div
        className="player-container_color"
        style={{ backgroundColor: player.color }}
      />
      <div className="player-container_name">{player.name}</div>
      <button className="btn remove-player" onClick={() => onRemove(player.id)}>
        X
      </button>
    </div>
  );

  return (
    <div className="players-list">
      <h3 className="players-list_title">Players:</h3>
      <div className="players-container">{players.length ? players.map(renderPlayer) : <h4 className="players-placeholder">Add players below...</h4>}</div>
      <NewPlayerForm onAdd={onAdd} playersLength={players.length} />
    </div>
  );
}
