import React, { useState, useEffect, useRef } from 'react'
import reload from '../assets/reload.png'
import ConfettiExplosion from 'react-confetti-explosion';
import Square from './Square'

function TicTacToe() {
    const [squares, setSquares] = useState(new Array(9).fill(null))
    const [result, setResult] = useState(null)
    const [turn, setTurn] = useState('X')
    const [disabled, setDisabled] = useState(false)
    const [isExploding, setIsExploding] = useState(false);
    const [history, setHistory] = useState([])
    const lastMoveRef = useRef(null);

    useEffect(() => {
        if (lastMoveRef.current) {
            lastMoveRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [history]); // Runs every time history changes

    const setSquare = (i) => {
        if (squares[i]) {
            alert("Invalid Move")
        } else {
            const temp = squares
            temp[i] = turn
            setSquares(temp)
            if (turn == 'X') {
                setTurn('O')
            } else {
                setTurn('X')
            }
            setHistory([...history, { turn: turn, squares: [...squares] }])
            setResult(gameOver())
        }
    }

    const resetGame = () => {
        setTurn('X')
        setResult('')
        setIsExploding(false)
        setDisabled(false)
        setHistory([])
        setSquares(new Array(9).fill(null))
    }

    const gameOver = () => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ]
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i]
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                setIsExploding(true)
                setDisabled(true)
                return "Winner: " + squares[a]
            }
        }
        if (!squares.includes(null)) {
            setDisabled(true)
            return "Draw"
        }
    }

    return (
        <div className='bg-neutral-50 h-screen w-screen'>
            <div className='absolute top-0 left-[50vw]'>{isExploding && <ConfettiExplosion dir={'top'} />}</div>
            <h1 className='md:text-7xl text-5xl text-center pt-10 font-semibold my-4'>Tic-Tac-Toe <div className='text-lg mt-4'>{"- "+ result&&result}</div></h1>
            <div className='flex justify-evenly items-center flex-wrap h-4/6 mt-2'>
                <div className='w-96 h-96 bg-neutral-800 m-1 flex flex-wrap border-2'>
                    {
                        squares.map((value, index) => (
                            <Square key={index} disabled={disabled} id={index} value={value} setSquare={setSquare} />
                        ))
                    }
                </div>
                <div className='h-96 w-96 m-1 flex flex-col gap-2 bg-neutral-100 rounded-2xl px-2 border-2 border-neutral-800'>
                    <div className='flex flex-row items-center justify-between border-b-2 border-neutral-800 pt-1'>
                        <div className='text-center text-lg font-semibold'>
                            Previous Moves
                        </div>
                        <button className='text-center rounded-2xl p-2 duration-300 active:scale-100 hover:scale-105' onClick={resetGame}>
                            <img
                                src={reload}
                                alt="reload"
                                className='h-6 w-6'
                            />
                        </button>
                    </div>
                    <div className='overflow-scroll h-full mb-2 flex flex-col'>
                        {
                            history.length != 0 ? history.map((item, index) => (
                                <button className={`font-semibold text-white w-80 text-left text-lg rounded p-2 duration-300 active:scale-[0.98] mt-1 mb-2 ${item.turn == 'X' ? 'bg-blue-400 hover:bg-blue-300 self-start' : 'bg-green-400 hover:bg-green-300 self-end'}`}
                                    ref={index === history.length - 1 ? lastMoveRef : null}
                                    onClick={() => {
                                        setSquares([...item.squares])
                                        if (item.turn === 'X') {
                                            setTurn('O')
                                        } else {
                                            setTurn('X')
                                        }
                                        setHistory(history.slice(0, index + 1))
                                        setDisabled(false)
                                        setResult('')
                                        setIsExploding(false)
                                    }}
                                >Go to move {(index + 1) + " played by " + item.turn
                                    }</button>
                            )) : (
                                <div className='font-semibold h-full flex pt-[38%] justify-center'>
                                    No Moves Played Yet
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicTacToe