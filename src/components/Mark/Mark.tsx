import React from "react";
import './Mark.css'

interface Mark {
    children: string
}

const Mark = ({ children } : Mark) => {

    return (
        <span className='Mark'>
            {
                children
            }
        </span>
    )
}

export default Mark;