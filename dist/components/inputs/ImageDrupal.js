import React from 'react';
import './Image.css';
import TextField from '@mui/material/TextField';
export default function ImageDrupal({ 
//. props for Image.tsx
src, labelImageDiv, updateImageOnClick, defaultValueAlt, onChangeImageInput, onClickImageInput, }) {
    return (React.createElement("div", { className: "img-input" },
        React.createElement("div", { className: "position" }, labelImageDiv),
        React.createElement("img", { src: src, alt: "logo", className: "img", onClick: updateImageOnClick }),
        React.createElement("div", { className: "image-input" },
            React.createElement(TextField, { type: "text", label: "Alt", defaultValue: defaultValueAlt, onChange: onChangeImageInput, onClick: onClickImageInput, 
                //. -------------- CSS --------------
                style: { marginBottom: '3rem' } }))));
}
