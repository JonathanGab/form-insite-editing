import React from 'react';
import './Input.css';
import TextField from '@mui/material/TextField';
export default function TextInput(props) {
    return (React.createElement("div", { className: "input-container" },
        React.createElement(TextField, { type: "text", 
            // input props
            label: props.TextInputlabel, defaultValue: props.defaultValueTextInput, onChange: props.onChange, 
            // for style of input
            rows: props.rows, multiline: true, disabled: props.TextInputlabel === 'id' ? true : false })));
}
