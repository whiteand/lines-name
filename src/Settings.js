import React from "react";
import { log } from "./utils";
import NumberInput from "./NumberInput";
import SettingsPlayersList from './SettingsPlayersList'

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
      <SettingsPlayersList
        players={players}
        onAdd={handleAddPlayer}
        onRemove={handleRemovePlayer}
      />
      <button className="btn play-btn" onClick={onPlay} disabled={players.length === 0}>
        Play
      </button>
    </div>
  );
}
