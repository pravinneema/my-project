
import React, { useState } from 'react'
import styled from 'styled-components'

// winner
// css
// state

const winnerCombination = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,4,8],
  [2,4,6],
  [0,3,6],
  [1,4,7],
  [7,5,8]
];

const getWinnder = (board) => {
  for(let i = 0; i < winnerCombination.length; i++ ){
    const [x,y,z] = winnerCombination[i];
    if(board[x] && board[x] === board[y] && board[x] === board[z]) {
      return board[x];
    }
  }
  return null;
};

const Board = (props) => {
  const {board} = props;
  return (
    <div className="tt-board" style={{display:'grid', gridTemplateColumns: '33.3% 33.3% 33.3%'}}>
      {
        board.map((item, index) => {
          return(
          <button 
            disabled={item || props.completed}
            className="tile" 
            style={{'height':'150px'}}
            onClick= {(e) => {
              e.preventDefault();
              props.onClick(index);
            }}>
            {item}
          </button>
          )
      })}
    </div>
  );
};

const App = () => {
  // board
  // isXplaying
  // completed
  const [board, setBoard] = useState(new Array(3 * 3).fill(null));
  const [isXPlaying, setisXPlaying] = useState(true);
  const marked = isXPlaying ? 'X':'O';
  const winner = getWinnder(board);
  const statusMsg = () => {
    if(winner) {
      return `${winner} is the winner`; 
    }
    if(board.indexOf(null) === -1) {
      return `No winner : Game is draw`;
    }
    return `${marked} turn now`;
  };

  const reset = () => {
     setBoard(new Array(3 * 3).fill(null));
    setisXPlaying(true);
  }
  
  return (
    <div className='App'>
      <div style={{'display':'flex', 'justifyContent':'space-around', 'margin': '10px'}}>
        <div>Hello React ---  ${statusMsg()}</div>
        <button onClick={(e) => {
          e.preventDefault();
          if(!winner && !window.confirm('Are you sure')){
            return; 
          }
          reset();
        }}>Reset </button>
      </div>
      <Board 
        board={board}
        completed= {winner}
        onClick={ (index) => {
          const cloneBoard = board.slice();
          cloneBoard[index] = marked
          setBoard(cloneBoard);
          setisXPlaying(!isXPlaying);
        }}
      />
    </div>
  );
}

export default App



