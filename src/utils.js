import { useState } from 'react'
import { memoizeWith } from 'ramda'

export const log = caption => (...args) => {
  console.groupCollapsed(caption);
  console.log({ args });
  console.groupEnd(caption);
};

export const useMergeState = initialValue => {
  const [value, setValue] = useState(initialValue)
  return [
    value,
    (newValue) => {
      setValue(value => value ? { ...value, ...newValue } : newValue)
    }
  ]
}

export const getBlockId = (row, col) => `${row}-${col}`

export const getBlocks = memoizeWith(x => x, ({ horizontal, vertical, filledBlocks, players }) => {
  const height = vertical.length
  const width = horizontal[0].length
  const getBlock = (rowInd, colInd) => {
    const top = horizontal[rowInd][colInd]
    const bottom = horizontal[rowInd+1][colInd]
    const left = vertical[rowInd][colInd]
    const right = vertical[rowInd][colInd+1]
    const blockId = getBlockId(rowInd, colInd)
    const playerId = filledBlocks[blockId] || null
    const player = playerId && players.find(player => player.id === playerId)
    return {
      row: rowInd,
      col: colInd,
      top,
      right,
      bottom,
      left,
      // occupiedBy: player
      occupiedBy: [null, 1, 2][Math.floor(Math.random() * 3)]
    }
  }

  const blocks = Array.from({ length: height }, (row, rowInd) => Array.from({ length: width }, (el, colInd) => getBlock(rowInd, colInd)))
  return blocks
})