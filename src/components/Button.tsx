import React from "react";

export enum ButtonType {
    PRIMARY,
    SECONDARY,
    ACTION,
}

const Button: React.FC<{
    type: ButtonType;
    onClick: (value: string) => void;
    className?: string;
    children: string;
}> = ({ type, onClick, className, children }) => {
    let _className;
    switch (type) {
        case ButtonType.PRIMARY:
            _className = "bg-gray-300";
            break;
        case ButtonType.SECONDARY:
            _className = "bg-gray-100";
            break;
        case ButtonType.ACTION:
            _className = "bg-blue-500 text-white";
            break;
    }

    return (
        <button
            className={`px-8 py-2 border border-gray-200 rounded duration-300 hover:scale-105 hover:opacity-75 ${_className} ${className}`}
            onClick={() => onClick(children)}
        >
            {children}
        </button>
    );
};

export default Button;
