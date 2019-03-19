import React, { useState } from 'react'
import LabeledInput from './LabeledInput'

export default function NewPlayerForm({ onAdd, playersLength }) {
  const [newPlayer, setNewPlayer] = useState({
    name: "Player " + (playersLength + 1),
    color: "#0000ff"
  });

  const handleNewPlayerColorChange = e => {
    setNewPlayer({
      ...newPlayer,
      color: e.target.value
    });
  };
  return (
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
            name: "",
            color: "#000000"
          });
        }}
      >
        Add
      </button>
    </div>
  );
}