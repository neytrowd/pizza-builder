import React, {useEffect, useRef, useState} from "react";
import './Counter.css'

interface Ref {
    current: any;
}

interface Counter {
    id: number
    reset: Boolean
    initialValue: number
    increase: Function
    decrease: Function
,}

const Counter = ({ id, increase, decrease, initialValue, reset }: Counter) => {
    let inputRef: Ref = useRef(null);
    let [counter, setCounter] = useState(initialValue);

    useEffect(() => {
        if(reset) {
            setCounter(0)
        }
        else{
            setCounter(initialValue)
        }
    }, [initialValue])

    function increaseCount(){
        setCounter(Number(++inputRef.current.value))
        increase(id, Number(inputRef.current.value));
    }

    function decreaseCount(){
        if(Number(inputRef.current.value)  !== 0){
            setCounter(Number(--inputRef.current.value));
            decrease(id, Number(inputRef.current.value));
        }
    }

    return (
        <span className='Counter'>
            <button type="button" className="btn btn-danger" onClick={decreaseCount}>-</button>
            <input ref={inputRef} value = {counter} type="text" className="form-control" disabled/>
            <button type="button" className="btn btn-success" onClick={increaseCount}>+</button>
        </span>
    )
}

export default Counter;