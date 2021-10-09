import React from "react";
import {NavLink} from "react-router-dom";
import './Navigation.css';

const Navigation = () => {

    return (
        <nav className='Navigation'>
            <ul>
                <li><NavLink exact to='/'>Build your pizza</NavLink></li>
                <li><NavLink exact to='/'>Ingredients</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navigation