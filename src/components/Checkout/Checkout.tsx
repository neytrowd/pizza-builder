import React, {useEffect, useRef, useState} from "react";
import './Checkout.css';
import {getData, has, setData} from "../../Utils";
import CheckoutItem from "../CheckoutItem";

interface Ref {
    current: any;
}

const Checkout = () => {
    let [products, setProducts] = useState([]);
    let [hasCoupon, setHasCoupon] = useState(false);
    let [valid,  setValid] = useState(false);
    let [validName, setValidName] = useState(true);
    let [validEmail, setValidEmail] = useState(true);
    let [validLength, setValidLength] = useState(true);
    let [validCoupon, setValidCoupon] = useState(true)
    let nameRef:Ref = useRef(null);
    let emailRef:Ref = useRef(null);
    let methodRef:Ref = useRef(null);
    let notesRef:Ref = useRef(null);
    let clientRef:Ref = useRef(null);
    let statusCouponRef:Ref = useRef(null);
    let couponRef:Ref = useRef(null);

    useEffect(() => {
        let key:string = Object.keys(localStorage)[0];
        let data: any = getData(key);
        setProducts(data);
    }, [])

    function couponHandler() {
        let status = statusCouponRef.current.checked
        if (status) {
            setHasCoupon(true)
            setValidCoupon(false);
        }
        else {
            setHasCoupon(false);
            setValidCoupon(true);
        }
    }

    function emailValidation() {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let value = emailRef.current.value;
        let checkValid = regex.test(String(value).toLowerCase());
        let checkLength = value.length > 4;
        setValid(checkValid);
        setValidLength(checkLength);
        setValidEmail(checkValid);
    }

    function nameValidation() {
        let value = nameRef.current.value;
        let check = value.length > 0;
        setValidName(check);
        setValid(check);
    }

    function couponValidation() {
        if(hasCoupon) {
            let value = couponRef.current.value;
            let check = value.length > 0;
            setValidCoupon(check);
            setValid(check);
        }
        else {
            setValidCoupon(true);
            setValid(true);
        }
    }

    function save() {
        let hasKey = has('pizza');
        let product = {
            name : nameRef.current.value,
            email : emailRef.current.value,
            method : methodRef.current.value,
            notes : notesRef.current.value,
            products: products,
            client : clientRef.current.checked,
            coupon : couponRef.current.value,
        }
        if(hasKey) {
            let data: any = getData('pizza');
            data = [...data, product];
            setData('pizza', data);
        }
        else { setData('pizza', [product]) }
        alert('Submitted');
    }

    return (
        <div className='Checkout'>
            <div className="Checkout-inner">
                <div className='row mb-2'>
                    <h2 className="text-center">Ingredient info:</h2>
                </div>
                <div className="Checkout-items">
                    { products.map((item:any) => (
                        <CheckoutItem key={item.id} item = { item }/>
                    ))}
                </div>
                <div className='row mb-2'>
                    <h2 className="text-center">Checkout info:</h2>
                </div>

                <form action="#" className={valid ? '' : 'invalid'}>
                    <div className="row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Name:</label>
                        <div className="col-sm-10">
                            <input onChange={nameValidation} ref={nameRef} type="text"
                                   className="form-control" placeholder='Your name'/>
                        </div>
                    </div>
                    <div className="mt-3 row">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Email:</label>
                        <div className="col-sm-10">
                            <input ref={emailRef} type="email" className="form-control"
                                   placeholder='Your email' onChange={emailValidation}/>
                        </div>
                    </div>
                    <div className="mt-3 row">
                        <label htmlFor="inputPassword" className="col-sm-4 col-form-label">Choose delivery method:</label>
                        <div className="col-sm-8">
                            <select ref={methodRef} className="form-select">
                                <option>Delivery</option>
                                <option>Local pickup</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-3 row">
                        <label htmlFor="notes" className="col-sm-3 col-form-label">Additional notes:</label>
                        <div className="col-sm-9">
                            <textarea  ref={notesRef} className="form-control" id="notes" />
                        </div>
                    </div>
                    <div className="mt-3 row  d-flex align-items-center">
                        <label htmlFor="notes" className="col-sm-4 col-form-label">Are you a regular client:</label>
                        <div className="col-sm-8">
                            <input ref={clientRef} className="form-check-input" type="radio" name='client' id="client1"/>
                            <label className="form-check-label mr-5" htmlFor='client1'>Yes</label>
                            <input className="form-check-input" type="radio" name='client' id="client2"/>
                            <label className="form-check-label" htmlFor='client2'>No</label>
                        </div>
                    </div>
                    <div className="mt-3 row d-flex align-items-center">
                        <label htmlFor="notes" className="col-sm-5 col-form-label">Dou you have a coupon code?</label>
                        <div className="col-sm-7">
                            <div className="form-check form-switch">
                                <input onChange={couponHandler} ref={statusCouponRef}
                                       className="form-check-input" type="checkbox"/>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Coupon:</label>
                        <div className="col-sm-10">
                            <input onChange={couponValidation} ref={couponRef}
                                   type="password"
                                   className="form-control" id="name"
                                   placeholder='Coupon code'
                                   disabled = { !hasCoupon }
                            />
                        </div>
                    </div>
                    <div className="mt-3 d-flex justify-content-end">
                        <input onClick={() => setHasCoupon(false)} type="reset"
                               value="Reset" className='btn btn-secondary'/>
                        <button disabled={!(valid && validEmail && validCoupon && validName)} onClick={save}
                                type="button" className="btn btn-primary">Submit</button>
                    </div>
                </form>

                <h5 className='Checkout-validation text-center'>
                    <p>{ !validName && 'Name: must be non-empty'}</p>
                    <p>{ !validEmail && 'Email: not a valid e-mail address'}</p>
                    <p>{ !validLength && 'Email: must be at least 4 characters long' }</p>
                    <p>{ !validCoupon && 'Coupon code: must be non-empty' }</p>
                </h5>

            </div>
        </div>
    )
}

export default Checkout;