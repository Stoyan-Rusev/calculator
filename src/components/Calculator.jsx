import styles from './Calculator.module.css'

import { evaluate } from "mathjs";
import { useState } from "react";

export default function Calculator() {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('0');
    const [isFirst, setIsFirst] = useState(true);
    const [isLastSymbolOp, setIsLastSymbolOp] = useState(false);

    const numberClick = (value) => {
        setExpression(expression => expression + value);
        setIsLastSymbolOp(false);
        setIsFirst(false);
    };

    const operatorClick = (value) => {
        if (isFirst && value !== '-') return;

        if (isLastSymbolOp) return;

        if (isFirst && value === '-') value = '-';

        if (value === '.') value = '.';

        setExpression(expression => expression + value);
        setIsFirst(false);
        setIsLastSymbolOp(true);
    };

    const equalsClick = () => {
        try {
            if (isLastSymbolOp || isFirst) {
                return;
            };

            const res = evaluate(expression).toString();
            setResult(res);
            setExpression(res);
        } catch (error) {
            setExpression('')
            setResult('0')
        }
    };

    const allClearClick = () => {
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
                <button className={styles.ac} onClick={allClearClick}>AC</button>
                <div></div>
                <div></div>
                <div></div>

                <button onClick={() => numberClick("7")}>7</button>
                <button onClick={() => numberClick("8")}>8</button>
                <button onClick={() => numberClick("9")}>9</button>
                <button className={styles.op} onClick={() => operatorClick("/")}>/</button>

                <button onClick={() => numberClick("4")}>4</button>
                <button onClick={() => numberClick("5")}>5</button>
                <button onClick={() => numberClick("6")}>6</button>
                <button className={styles.op} onClick={() => operatorClick("*")}>*</button>

                <button onClick={() => numberClick("1")}>1</button>
                <button onClick={() => numberClick("2")}>2</button>
                <button onClick={() => numberClick("3")}>3</button>
                <button className={styles.op} onClick={() => operatorClick("-")}>-</button>

                <button onClick={() => numberClick("0")}>0</button>
                <button onClick={() => operatorClick(".")}>.</button>
                <button className={styles.eq} onClick={equalsClick}>=</button>
                <button className={styles.op} onClick={() => operatorClick("+")}>+</button>
            </div>

        </div>
    );
};