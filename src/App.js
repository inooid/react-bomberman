import React, { Component } from 'react';

import BreakableWall from './components/BreakableWall';
import Wall from './components/Wall';
import Walkable from './components/Walkable';
import Player from './components/Player';

const WALL = { type: 'WALL' };
const BWAL = { type: 'BREAKABLE_WALL' };
const USER = { type: 'PLAYER' };

class App extends Component {
  state = {
    // prettier-ignore
    playingField: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, null, null, BWAL, null, null, WALL],
      [WALL, null, WALL, null, WALL, null, WALL],
      [WALL, BWAL, null, null, null, null, WALL],
      [WALL, null, WALL, null, WALL, null, WALL],
      [WALL, null, null, null, null, null, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL],
    ],

    players: {
      you: { x: 1, y: 1 },
    },
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    switch (e.code) {
      case 'ArrowUp':
        console.log('MOVE UP');
        return this.movePlayer('y', -1);
      case 'ArrowDown':
        console.log('MOVE DOWN');
        return this.movePlayer('y', 1);
      case 'ArrowLeft':
        console.log('MOVE LEFT');
        return this.movePlayer('x', -1);
      case 'ArrowRight':
        console.log('MOVE RIGHT');
        return this.movePlayer('x', 1);
      case 'Space':
        console.log('💣');
      default:
        return;
    }
  };

  movePlayer = (axis, amount, target = 'you') => {
    const currentCoordinates = this.state.players[target];
    const nextCoordinates = { ...currentCoordinates, [axis]: currentCoordinates[axis] + amount };

    if (!this.canMove(nextCoordinates)) return;

    this.setState(prevState => ({
      players: {
        ...prevState.players,
        [target]: nextCoordinates,
      },
    }));
  };

  canMove = coordinates => {
    const playingFieldSpot = this.state.playingField[coordinates.y][coordinates.x];

    if (playingFieldSpot === null) {
      return true;
    }

    return false;
  };

  render() {
    const playersData = Object.entries(this.state.players);

    return (
      <div style={{ backgroundColor: 'lightgray' }}>
        {this.state.playingField.map((rows, y) => (
          <div key={`row-${y}`} style={{ display: 'flex' }}>
            {rows.map((el, x) => {
              const isPlayerOnTile = playersData.some(
                ([_, coordinates]) => coordinates.x === x && coordinates.y === y
              );

              if (isPlayerOnTile) {
                return <Player key={`player-${x}-${y}`} />;
              }

              if (!el) return <Walkable key={`walkable-${x}-${y}`} />;

              switch (el.type) {
                case 'WALL':
                  return <Wall key={`wall-${x}-${y}`} />;
                case 'BREAKABLE_WALL':
                  return <BreakableWall key={`breakable-wall-${x}-${y}`} />;
                default:
                  return <Walkable key={`walkable-${x}-${y}`} />;
              }
            })}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
