import { useState } from 'react'
export const useGameState = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [settings, setSettings] = useState({
    width: 10,
    height: 10,
    players: [
      { id: 1, color: '#f00', name: 'Player 1' },
      { id: 2, color: '#00f', name: 'Player 2' }
    ]
  })
  return {
    isPlaying,
    setIsPlaying,
    ...settings,
    setSettings
  }
}