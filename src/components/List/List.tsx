import React from "react";
import './List.css';

interface List {
    children: any
}

const List = ({ children } : List) => {

    return (
        <ul className='List list-group'>
            {
                children
            }
        </ul>
    )
}

export default List;