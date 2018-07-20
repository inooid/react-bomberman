import React, { Component } from 'react';

import BreakableWall from './components/BreakableWall';
import Wall from './components/Wall';
import Walkable from './components/Walkable';
import Player from './components/Player';
import Bomb from './components/Bomb';

const WALL = { type: 'WALL' };
const BWAL = { type: 'BREAKABLE_WALL' };

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

    bombsByPlayer: {
      you: [],
    },

    players: {
      you: {
        maxBombs: 1,
        strength: 1,
        x: 1,
        y: 1,
      },
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
        return this.placeBomb();
      default:
        return;
    }
  };

  placeBomb = (target = 'you') => {
    const player = this.state.players[target];
    const { strength, x, y } = player;
    const coordinates = { x, y };

    if (!this.canPlaceBomb(target)) return;

    this.setState(prevState => ({
      bombsByPlayer: {
        ...prevState.bombsByPlayer,
        [target]: [...prevState.bombsByPlayer[target], { ...coordinates, strength }],
      },
    }));
  };

  canPlaceBomb = target => {
    const player = this.state.players[target];
    const placedBombCount = this.state.bombsByPlayer[target].length;

    return placedBombCount < player.maxBombs;
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
    const isBomb = this.isBombOnPosition(coordinates);

    return playingFieldSpot === null && !isBomb;
  };

  isBombOnPosition = ({ x, y }) =>
    Object.entries(this.state.bombsByPlayer).some(([_, bombs]) =>
      bombs.some(bombCoordinates => bombCoordinates.x === x && bombCoordinates.y === y)
    );

  isPlayerOnPosition = ({ x, y }) =>
    Object.entries(this.state.players).some(
      ([_, coordinates]) => coordinates.x === x && coordinates.y === y
    );

  render() {
    return (
      <div style={{ backgroundColor: 'lightgray' }}>
        {this.state.playingField.map((rows, y) => (
          <div key={`row-${y}`} style={{ display: 'flex' }}>
            {rows.map((el, x) => {
              const keyData = `${x}-${y}`;
              const isBombOnPosition = this.isBombOnPosition({ x, y });
              const isPlayerOnPosition = this.isPlayerOnPosition({ x, y });

              if (isPlayerOnPosition && isBombOnPosition)
                return (
                  <div
                    className="TwoTilesInOne"
                    style={{ width: 50, height: 50 }}
                    key={`bomb-player-${keyData}`}
                  >
                    <Player />
                    <Bomb />
                  </div>
                );
              if (isBombOnPosition) return <Bomb key={`bomb-${keyData}`} />;
              if (isPlayerOnPosition) return <Player key={`player-${keyData}`} />;
              if (!el) return <Walkable key={`walkable-${keyData}`} />;

              switch (el.type) {
                case 'WALL':
                  return <Wall key={`wall-${keyData}`} />;
                case 'BREAKABLE_WALL':
                  return <BreakableWall key={`breakable-wall-${keyData}`} />;
                default:
                  return <Walkable key={`walkable-${keyData}`} />;
              }
            })}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
