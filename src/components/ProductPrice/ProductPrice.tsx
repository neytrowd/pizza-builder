import React from "react";

interface ProductPrice {
    name: string,
    price: string
}

const ProductPrice = ({ name, price } : ProductPrice) => {

    return (
        <div className='ProductPrice'>
            <p>{ name }</p>
            <p>{ price }</p>
        </div>
    )
}

export default ProductPrice;