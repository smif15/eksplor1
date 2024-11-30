import React from 'react'
import { useState } from 'react'

function Header({title}) {
  return <h1 className="text-center">{title ? title : 'Ini default title'}</h1>;
}



function ShowNames() {
  const names = ['Faris', 'Iqbal', 'Maulana']

  return (
    <>
      <Header title="Ini title khusus" />
      <ul>
        {names.map(name => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </>

  )
}

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick} >{value}</button>
  )
}


export default function Board() {

  const [like, setLike] = useState(0);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);

  function handleClick(i : number) {
    const nextSquares = squares.slice();
    if (nextSquares[i] === null && (!calculateWinner(squares))) {
      isX ? nextSquares[i] = "X" : nextSquares[i] = "O";
      setIsX(!isX)
      setSquares(nextSquares);
    }
  }

  function pageLike() {
    setLike(like + 1)
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Pemenang: " + winner
  } else {
    status = "Pemain selanjutnya: " + (isX? 'X': 'O')
  }
  



  return (
    <>
      <Header />
      <p>{status}</p>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <ShowNames />
      <button onClick={pageLike}>Like{like}</button>
    </>
  );
}
