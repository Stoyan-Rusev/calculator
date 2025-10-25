import { evaluate } from "mathjs";
import { useState } from "react";

export default function Calculator() {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('0');

    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const operators = ['+', '-', '*', '/'];

    const buttonClickHandler = (value) => {
        setExpression(expression => expression + value);
    };
    const equalsClickHandler = () => {
        const res = evaluate(expression).toString();
        setResult(res);
        setExpression(res);
    };
    const allClearClickHandler = () => {
        setExpression('');
        setResult('0');
    }

    return (
        <div className="device">

            <h1>Calculator</h1>

            <div className="screen">
                <p className="expression">{expression || '\u00A0'}</p>
                <h2 className="result">{result}</h2>
            </div>

            <div className="keyboard">
                <div className="numbers">
                    {numbers.map(val => <button onClick={() => buttonClickHandler(val)} key={val}>{val}</button>)}
                </div>
                <div className="operators">
                    {operators.map(val => <button onClick={() => buttonClickHandler(` ${val} `)} key={val}>{val}</button>)}
                </div>
                <div>
                    <button onClick={equalsClickHandler}>=</button>
                    <button onClick={allClearClickHandler}>AC</button>
                </div>
            </div>

        </div>
    );
};