import React from 'react'
import x from '../assets/ttt-x.png'
import o from '../assets/ttt-o.png'

function Square({ value, setSquare, id, disabled }) {

    return (
        <button className={`w-1/3 h-1/3 bg-neutral-100 border-2 border-neutral-800 duration-100 active:scale-100 ${!value ? 'hover:scale-105 pointer' : 'cursor-not-allowed'}`}
            disabled={value || disabled}
            onClick={() => {
                setSquare(id)
            }}>
            {
                value === 'X' && <img src={x} alt="X" className='h-3/5 w-3/5 mx-auto' />
            }
            {
                value === 'O' && <img src={o} alt="O" className='h-3/5 w-3/5 mx-auto' />
            }
        </button>
    )
}

export default Square