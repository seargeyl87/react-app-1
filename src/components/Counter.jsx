import React, {useState} from 'react';

let Counter = function () {
    let [count, setCount] = useState(0);

    function increment() {
        setCount(count + 1)
       }
       function decrement() {
        setCount(count - 1)
       }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>увеличить на 1</button>
            <button onClick={decrement}>уменьшить на 1</button> 
        </div>
    )
}
export default Counter;