import React from 'react';

export const DEFAULT_GRID_H = 0.55 * 16;
export const DEFAULT_GRID_V = 0.1875 * 16;

export const GridContext = React.createContext({
  h: DEFAULT_GRID_H,
  v: DEFAULT_GRID_V,
});

export function GridSystem(): JSX.Element {
  return (
    <div id="gridSystem">
      <div id="vGridSystem">
        {new Array(30).fill('').map((_, index) => {
          return [
            <div key={`g${index}`} className="gutter"></div>,
            <div key={`c${index}`} className="column"></div>,
          ];
        })}
      </div>
      <div id="hGridSystem">
        {new Array(100).fill('').map((_, index) => {
          return [<div key={`${index}`} className="row"></div>];
        })}
      </div>
      <style jsx>{`
        #vGridSystem,
        #hGridSystem {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 99999;
          opacity: 0.3;
          overflow: hidden;
          display: none;
        }
        #gridSystem:target #vGridSystem,
        #gridSystem:target #hGridSystem {
          display: flex;
        }
        #vGridSystem {
          flex-direction: row;
          opacity: 0.3;
          overflow: hidden;
          overflow-x: scroll;
        }
        #vGridSystem:target {
          display: flex;
        }
        #hGridSystem {
          flex-direction: column;
          opacity: 0.3;
          overflow: hidden;
        }
        #hGridSystem:target {
          display: flex;
        }
        .gutter {
          width: var(--gutter);
          flex: none;
          background-color: #ccc;
        }
        .column {
          width: var(--column);
          flex: none;
          background-color: #ddd;
        }
        .row {
          width: 100vw;
          height: var(--vRythm);
          flex: none;
          background-color: #ccc;
        }
        .row:nth-child(2n) {
          background-color: #ddd;
        }
      `}</style>
    </div>
  );
}
