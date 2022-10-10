import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './SelectInput.css';
export default function SelectInput({ inputLabel, label, value, onChange, }) {
    return (React.createElement("div", { className: "select-input-container" },
        React.createElement(FormControl, { style: { width: 20 + '%' } },
            React.createElement(InputLabel, { id: "select-label" }, inputLabel),
            React.createElement(Select, { labelId: "select-label", id: "simple-select", value: value, label: label, onChange: onChange },
                React.createElement(MenuItem, { value: "true" }, "true"),
                React.createElement(MenuItem, { value: "false" }, "false")))));
}
