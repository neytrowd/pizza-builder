import React from "react";
import './CheckoutItem.css';

const CheckoutItem = ({ item }: any) => {

    return (
        <div className='CheckoutItem'>
            <p>{ item.name }</p>
            <img src={`images/${item.photo}`} alt="product"/>
            <p>{ item.count }</p>
        </div>
    )
}

export default CheckoutItem;