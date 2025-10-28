import styles from './Calculator.module.css'

import { evaluate } from "mathjs";
import { useState } from "react";

export default function Calculator() {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('0');
    const [isFirst, setIsFirst] = useState(true);
    const [isLastSymbolOp, setIsLastSymbolOp] = useState(false);


    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const operators = ['+', '-', '*', '/'];

    const numButtonClickHandler = (value) => {
        setExpression(expression => expression + value);
        setIsLastSymbolOp(false);
        setIsFirst(false);
    };

    const opButtonClickHandler = (value) => {
        if (isFirst && value.trim() !== '-') {
            return;
        }

        if (isLastSymbolOp) {
            return;
        }

        setExpression(expression => expression + value);
        setIsFirst(false);
        setIsLastSymbolOp(true);
    };

    const equalsClickHandler = () => {
        if (isLastSymbolOp || isFirst) {
            return;
        };

        const res = evaluate(expression).toString();
        setResult(res);
        setExpression(res);
    };

    const allClearClickHandler = () => {
        setExpression('');
        setResult('0');
        setIsFirst(true);
        setIsLastSymbolOp(false);
    };  

    return (
        <div className={styles.calculator}>

            <div className={styles.screen}>
                <p className={styles.expression}>{expression || '\u00A0'}</p>
                <h2 className={styles.result}>{result}</h2>
            </div>

            <div className={styles.keyboard}>

                {numbers.map(val => <button onClick={() => numButtonClickHandler(val)} key={val}>{val}</button>)}
                {operators.map(val => <button onClick={() => opButtonClickHandler(` ${val} `)} key={val}>{val}</button>)}

                <div>
                    <button className={styles.eq} onClick={equalsClickHandler}>=</button>
                    <button className={styles.ac} onClick={allClearClickHandler}>AC</button>
                </div>
            </div>

        </div>
    );
};