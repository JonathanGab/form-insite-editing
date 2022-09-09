import React from 'react';
import './TextInput.css';
import TextField from '@mui/material/TextField';
export default function TextInput(props) {
    return (React.createElement("div", { className: "input-container" },
        React.createElement("label", { className: "input-label" }, props.inputLabel),
        React.createElement(TextField, { type: "text", label: props.label, defaultValue: props.defaultValue, onChange: props.onChange, className: props.className })));
}
