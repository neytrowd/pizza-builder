import React, {useRef, useState} from "react";
import './Build.css';
import Data from "../../Data";
import Product from "../Product";
import Mark from "../Mark";
import List from "../List";
import ProductPrice from "../ProductPrice";
import Counter from "../Counter";
import { NavLink } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import {clear, clearData, getData, setData} from "../../Utils";
import Modal from "../Modal";
import Loader from "../Loader";

const initialProducts: object[] = [
    {
        ...Data[0],
        count: 1
    }
];

const Build = () => {
    const ingredients = Data;
    const [products,  setProducts] = useState(initialProducts);
    const [counters, setCounters] = useState(counterValue(products));
    const [checkout, setCheckout]  = useState(true);
    const [openCheckout, setOpenCheckout] = useState(false);
    const [openLoad, setOpenLoad] = useState(false)
    const [productConfig, setProductConfig] = useState('');
    const [resetCounter, setResetCounter] = useState(false);
    const [lastId, setLastId] = useState('');
    const [loader, setLoader] = useState(false);
    const loadRef: any = useRef(null);

    function increase(id: number, count: number) {
        let product: any;
        let items: any = [...products];
        let index = items.findIndex((item:any) => item.id === id);
        if(index === -1) {
            product = ingredients.filter((item:any) => item.id === id)[0];
            product.count = count;
            setProducts([ ...items, product ]);
        }
        else {
            items[index].count = count;
            setProducts([ ...items ])
        }
    }

    function decrease(id: number, count: number) {
        let items: any = [...products];
        let index = items.findIndex((item:any) => item.id === id);
        if(count === 0) {
            items.splice(index, 1);
            setProducts([ ...items ]);
        }
        else {
            items[index].count = count;
            setProducts([ ...items ]);
        }
    }

    function counterValue(productList: object[]) {
        let items:any = productList;
        let arrCount: number[] = [];
        ingredients.forEach((item:any) => {
            let exist = items.findIndex((el:any) => el.id === item.id);
            (exist === -1) ? arrCount.push(0) : arrCount.push(items[exist].count);
        })
        return arrCount;
    }

    function close(type:string) {
        if(type === 'checkout') {
            setOpenCheckout(false);
            return
        }
        if(type === 'load') {
            setOpenLoad(false);
        }
    }

    function totalAmount() {
        return products.reduce((acc, current: any) =>
                        acc+=current.count*current.price,0);
    }

    function checkKeys() {
        return  Object.keys(localStorage).length > 0;
    }

    function setToBase() {
        let id: string = String(uuid());
        clearData(lastId);
        setLastId(id);
        setProductConfig(id);
        setData( id ,products);
        setCheckout(!checkKeys());
    }

    function reset() {
        setProducts(initialProducts);
        setResetCounter(true);
        setCounters(Array(ingredients.length).fill(Math.random()));
    }

    function load() {
        setLoader(true);
        let key: string = Object.keys(localStorage)[0];
        let userKey = loadRef.current.value;
        if(!key || !userKey || key !== userKey) {
            alert('The value does not exist'); return;
        }
        let productList: any = getData(key);
        let counterValues: any = [];

        ingredients.forEach((item:any) => {
            let index = productList.findIndex((pr: any) => pr.id === item.id)
            if( index !== -1 ) counterValues.push(productList[index].count)
            else counterValues.push(0);
        })

        setTimeout(() => {
            setProducts(productList);
            setLoader(false);
            setResetCounter(false);
            setCounters(counterValues);
        }, 1000)

        close('load');
    }

    return (
        <section className='Build'>
            <div className="Build-inner">
                <div className="Build-block">
                    <h3 className="text-center mb-3">Your pizza:</h3>
                    <div className="Build-selected">
                        { products.map((item:any) => (
                            <Product key={item.id} product={item.photo}/>
                        ))}
                    </div>
                </div>
                <div className="Build-preparation">
                    <div className='Build-price'>
                        <h3>Your pizza:</h3>
                        <Mark>{ `${ totalAmount() } $` }</Mark>
                        <button onClick={reset} className="btn btn-warning">Reset pizza</button>
                    </div>
                    <div className="Build-ingredients">
                        <List>
                            { Data.map((item:any, index) => {
                                if(item.id === 1) return;
                                return (
                                    <li key={item.id} className='list-group-item'>
                                        <ProductPrice
                                            name={item.name}
                                            price={`${item.price}$`}
                                        />
                                        <Counter
                                            id = {item.id}
                                            increase = {increase}
                                            decrease = {decrease}
                                            reset = { resetCounter }
                                            initialValue = {counters[index]}
                                        />
                                    </li>
                                )
                            })}
                            <li className='list-group-item list-group-item-light'>
                                <p>Total</p>
                                <span>{ `${ totalAmount() } $` }</span>
                            </li>
                            <li className='list-group-item'>
                                <button onClick={setToBase} type="button"
                                        className="btn btn-success">Save Pizza</button>
                                <button onClick={()=> setOpenCheckout(true)} type="button"
                                        className="btn btn-primary" disabled={checkout}>
                                    Checkout
                                </button>
                            </li>
                            <li className='list-group-item'>
                                <button onClick={()=> setOpenLoad(true)} type="button"
                                        className="btn btn-dark">Load pizza</button>
                            </li>
                        </List>
                    </div>
                    <div className='Build-config mt-2 text-center text-success'>
                        <p className='text-success'>
                            { productConfig && (
                                `Your pizza configuration has been saved. 
                                Your number is: ${ productConfig }`
                            )}
                        </p>
                        <p className='text-danger'>
                            { !productConfig && (
                                `Your pizza configuration hasn't been saved`
                            )}
                        </p>
                    </div>
                </div>
            </div>

            <Modal open={openCheckout} close = {() => close('checkout')}>
                <section className='Build-status'>
                    <div className="Build-info">
                        <h3 className='mb-2'>Your order</h3>
                        <p>The pizza has the following ingredients:</p>
                        <ul>
                            {products.map((item:any) => (
                                <li key={item.id}>
                                    { item.name }: { item.count }
                                </li>
                            ))}
                        </ul>
                        <h4 className='my-3'>Total price: { totalAmount() }$</h4>
                        <p>Continue to checkout?</p>
                    </div>
                    <div className="Build-action mt-4">
                        <button
                            className='btn btn-dark mx-2'
                            onClick={() => close('checkout')}
                        >Cancel</button>
                        <button className='btn btn-primary'>
                            <NavLink to='/checkout'>Continue</NavLink>
                        </button>
                    </div>
                </section>
            </Modal>

            <Modal open={openLoad} close = {() => close('load')}>
                <section className="Build-load pt-4">
                    <p>Load a pizza using a configuration number:</p>
                    <div className='row pl-3'>
                        <input ref={loadRef} type="text" className='form-control col-8'
                               placeholder='Configuration Number'
                        />
                        <button onClick={load} className='btn btn-primary col-3 ml-2'>Submit</button>
                    </div>
                </section>
            </Modal>

            { loader && <Loader/> }
        </section>
    )
}

export default Build;