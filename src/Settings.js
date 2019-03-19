import React, { useState } from "react";
import { log } from "./utils";
import NumberInput from "./NumberInput";
import NewPlayerForm from './NewPlayerForm';

function PlayersList({
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

export default function Settings({
  width,
  height,
  players,
  onPlay,
  onChange = log("Settings.props.onChange")
}) {
  const changeSettings = settingsPart =>
    onChange({
      height,
      width,
      players,
      ...settingsPart
    });
  const handleAddPlayer = ({ color, name }) => {
    const newId = Math.max(0, ...players.map(e => e.id)) + 1;
    const newPlayer = {
      id: newId,
      color,
      name
    };
    changeSettings({
      players: [...players, newPlayer]
    });
  };
  const handleRemovePlayer = id => {
    changeSettings({
      players: players.filter(e => e.id !== id)
    });
  };
  return (
    <div className="settings-wrapper">
      <NumberInput
        className="number-input-wrapper"
        label="Width:"
        value={width}
        onChange={width => changeSettings({ width })}
      />
      <NumberInput
        label="Height:"
        value={height}
        onChange={height => changeSettings({ height })}
      />
      <PlayersList
        players={players}
        onAdd={handleAddPlayer}
        onRemove={handleRemovePlayer}
      />
      <button className="btn play-btn" onClick={onPlay}>
        Play
      </button>
    </div>
  );
}
