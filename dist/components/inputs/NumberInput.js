import React from 'react';
import TextField from '@mui/material/TextField';
import './Input.css';
export default function NumberInput(props) {
    return (React.createElement("div", { className: "input-container" },
        React.createElement(TextField, { id: "outlined-basic", type: "number", variant: "outlined", 
            // input props
            label: props.label, defaultValue: Number(props.defaultValue), onChange: props.onChange, disabled: props.label === 'id' ? true : false, rows: props.rows })));
}
