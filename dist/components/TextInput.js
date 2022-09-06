import React from 'react';
export default function TextInput(props) {
    return (React.createElement("div", { className: "input-container" },
        React.createElement("label", { className: "input-label" }, props.inputLabel),
        React.createElement("input", { type: "text", defaultValue: props.defaultValue, onChange: props.onChange, name: props.name })));
}
