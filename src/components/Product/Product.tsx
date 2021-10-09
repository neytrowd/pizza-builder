import React from "react";
import './Product.css';

interface Props {
    product: string
}

const Product = ({ product } : Props) => {

    return (
        <div className='Product'>
            <img src={`images/${product}`} alt="product"/>
        </div>
    )
}

export default Product;