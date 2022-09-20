import { useState } from "react";

import Button, { ButtonType } from "./components/Button";
import "./App.css";

const OPERATORS = ["+", "-", "x", "÷"];
const BUTTONS = [...OPERATORS, "7", "8", "9", "=", "4", "5", "6", "1", "2", "3", "0", ".", "C"];

const indexOfOperator = (expression: string) => {
    for (const operator of OPERATORS) {
        const indexOfOperator = expression.indexOf(operator);
        if (indexOfOperator !== -1) return indexOfOperator;
    }

    return -1;
};

function App() {
    const [expression, setExpression] = useState("");

    const renderButton = (value: string) => {
        let type = ButtonType.SECONDARY;
        let onClick = onSecondaryButtonClicked;
        if (OPERATORS.indexOf(value) !== -1) {
            type = ButtonType.PRIMARY;
            onClick = onPrimaryButtonClicked;
        } else if (value === "=") {
            type = ButtonType.ACTION;
            onClick = onActionButtonClicked;
        }

        const className = value === "=" ? "row-span-4" : undefined;

        return (
            <Button key={value} type={type} onClick={onClick} className={className}>
                {value}
            </Button>
        );
    };

    const onPrimaryButtonClicked = (value: string) => {
        const lastChar = expression[expression.length - 1];
        if (OPERATORS.indexOf(lastChar) !== -1 || lastChar === "." || expression === "") return;

        const _indexOfOperator = indexOfOperator(expression);
        if (_indexOfOperator !== -1) {
            calculate(_indexOfOperator, value);
        } else {
            setExpression((_expression) => `${_expression}${value}`);
        }
    };

    const onSecondaryButtonClicked = (value: string) => {
        if (value === "C") {
            setExpression("");
            return;
        }

        setExpression((_expression) => `${_expression}${value}`);
    };

    const onActionButtonClicked = () => {
        const lastChar = expression[expression.length - 1];
        if (OPERATORS.indexOf(lastChar) !== -1 || lastChar === "." || expression === "") return;

        calculate(indexOfOperator(expression));
    };

    const calculate = (indexOfOperator: number, theLastOperator: string = "") => {
        if (indexOfOperator === -1) return;

        const firstNumber = +expression.substring(0, indexOfOperator);
        const secondNumber = +expression.substring(indexOfOperator + 1, expression.length);
        const operator = expression[indexOfOperator];

        let result;
        switch (operator) {
            case "+":
                result = firstNumber + secondNumber;
                break;
            case "-":
                result = firstNumber - secondNumber;
                break;
            case "x":
                result = firstNumber * secondNumber;
                break;
            case "÷":
                result = firstNumber / secondNumber;
                break;
        }
        setExpression(`${result}${theLastOperator}`);
    };

    return (
        <main className="h-screen grid place-content-center">
            <section className="w-[95%] max-w-[640px] p-6 border border-gray-200 rounded shadow">
                <p className="p-3 text-2xl border border-gray-200 rounded min-h-[58px]">{expression}</p>
                <div className="grid grid-cols-4 grid-rows-5 gap-3 mt-3">{BUTTONS.map((value) => renderButton(value))}</div>
            </section>
        </main>
    );
}

export default App;
