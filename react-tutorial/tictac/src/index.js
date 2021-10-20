import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import './index.css'

const Square = props => (
    <button className="square" onClick={() => props.onClick(props.number)}>
        {props.value}
    </button>
)

const RenderSquare = ({ number, squares, onClick}) => (
    <Square 
        value={squares[number]} 
        onClick={onClick}
        number={number}
    />
)

const Board = ({ squares, onClick }) => {
    const rowOne = [0, 1, 2]
    const rowTwo = [3, 4, 5]
    const rowThree = [6, 7, 8]

    const renderRowOne = []
    const renderRowTwo = []
    const renderRowThree = []

    for (let i = 0; i < 3; i++) {
        renderRowOne.push(<RenderSquare number={rowOne[i]} key={rowOne[i]} squares={squares} onClick={onClick} />)
        renderRowTwo.push(<RenderSquare number={rowTwo[i]} key={rowTwo[i]} squares={squares} onClick={onClick} />)
        renderRowThree.push(<RenderSquare number={rowThree[i]} key={rowThree[i]} squares={squares} onClick={onClick} />)
    }

    return (
        <div>
            <div className="board-row">
                {renderRowOne}
            </div>
            <div className="board-row">
                {renderRowTwo}
            </div>
            <div className="board-row">
                {renderRowThree}
            </div>
        </div>
    )
}
  
const Game = () => {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [history, setHistory] = useState([{ squares }])
    const [stepNumber, setStepNumber] = useState(0)
    const [xIsNext, setXIsNext] = useState(true)

    const calculateWinner = (squares) => {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
    }

    const jumpTo = step => {
        setStepNumber(step)
        setXIsNext((step % 2) === 0)
    }
    
    const current = history[stepNumber]
    

    const moves = history.map((step, move) => {
        const desc = move
            ? `Go to move #${move}`
            : `Go to game start`
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        )
    })

    let status

    const handleClick = (number) => {
        if (calculateWinner(squares) || squares[number]) {
            return
        }
        
        const actualHistory = history.slice(0, stepNumber + 1)
        const current = actualHistory[actualHistory.length -1]
        setSquares(current.squares.slice())
        
        let newSquares =  [...squares]
        newSquares[number] = xIsNext ? 'X' : 'O'
        setSquares(newSquares)

        const newHistory = history.concat([{
            squares: newSquares,
        }])

        setHistory(newHistory)

        setStepNumber(newHistory.length)

        setXIsNext(!xIsNext)

        const winner = calculateWinner(current.squares)

        winner
        ? status = `Winner: ${winner}`
        : status = `Next player: ${(xIsNext ? 'X' : 'O')}`
    }

    return (
        <div className="game">
        <div className="game-board">
            <Board 
                squares={squares}
                onClick={handleClick}
            />
        </div>
        <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
        </div>
        </div>
    )
}
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  )
  