import React from 'react';
import TextField from '@mui/material/TextField';
export default function NumberInput(props) {
    return (React.createElement("div", { className: "input-container" },
        React.createElement("label", { className: "input-label" }, props.inputLabel),
        React.createElement(TextField, { id: "outlined-basic", type: "number", label: props.label, variant: "outlined", defaultValue: Number(props.defaultValue), onChange: props.onChange, name: props.name })));
}
