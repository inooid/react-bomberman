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
      [WALL, USER, null, BWAL, null, null, WALL],
      [WALL, null, WALL, null, WALL, null, WALL],
      [WALL, BWAL, null, null, null, null, WALL],
      [WALL, null, WALL, null, WALL, null, WALL],
      [WALL, null, null, null, null, null, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL],
    ]
  };

  render() {
    return (
      <div style={{ backgroundColor: 'lightgray' }}>
        {this.state.playingField.map(rows => (
          <div style={{ display: 'flex' }}>
            {rows.map(el => {
              if (!el) return <Walkable />;

              switch (el.type) {
                case 'WALL':
                  return <Wall />;
                case 'BREAKABLE_WALL':
                  return <BreakableWall />;
                case 'PLAYER':
                  return <Player />;
                default:
                  return <Walkable />;
              }
            })}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
