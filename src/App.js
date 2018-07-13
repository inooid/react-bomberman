import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import BreakableWall from './components/BreakableWall';
import Wall from './components/Wall';
import Walkable from './components/Walkable';

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
    ]
  };

  render() {
    return (
      <div>
        {this.state.playingField.map(rows => (
          <div style={{ display: 'flex' }}>
            {rows.map(el => {
              if (!el) return <Walkable />;

              switch (el.type) {
                case 'WALL':
                  return <Wall />;
                case 'BREAKABLE_WALL':
                  return <BreakableWall />;
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
