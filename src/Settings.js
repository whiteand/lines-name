import React, { useState } from "react";
import { log } from './utils'
import LabeledInput from './LabeledInput'
import NumberInput from './NumberInput'


function PlayersList({
  players = [],
  onAdd = log("PlayersList.onAdd"),
  onRemove = log("PlayersList.onRemove")
}) {
  const [newPlayer, setNewPlayer] = useState({
    name: "Player " + (players.length + 1),
    color: "#0000ff"
  });
  const renderPlayer = player => (
    <div className="player-container" key={player.id}>
      <div className="player-container_color" style={{ backgroundColor: player.color }} />
      <div className="player-container_name">{player.name}</div>
      <button className="btn remove-player" onClick={() => onRemove(player.id)}>X</button>
    </div>
  );
  const handleNewPlayerColorChange = e => {
    setNewPlayer({
      ...newPlayer,
      color: e.target.value
    });
  };
  return (
    <div className="players-list">
      <h3 className="players-list_title">Players:</h3>
      <div className="players-container">{players.map(renderPlayer)}</div>
      <div className="newplayer-input">
        <h3>New player</h3>
        <LabeledInput
          value={newPlayer.name}
          onChange={name => setNewPlayer({ ...newPlayer, name })}
          label="Name:"
        />
        <LabeledInput
          label="Color:"
          input={() => (
            <div className="player-color-input">
              <input
                type="color"
                value={newPlayer.color}
                onChange={handleNewPlayerColorChange}
              />
              <div>{newPlayer.color}</div>
            </div>
          )}
        />
        <button
          className="btn"
          onClick={() => {
            onAdd({ ...newPlayer });
            setNewPlayer({
              name: '',
              color: '#000000'
            })
          }}
        >
          Add
        </button>
      </div>
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
    })
  }
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
