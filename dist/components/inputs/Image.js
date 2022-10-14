import React from 'react';
import './Image.css';
export default function Image({ 
//. props for Image.tsx
src, updateImageOnClick, }) {
    return (React.createElement("div", { className: "img-input" },
        React.createElement("img", { src: src, alt: "logo", className: "img", onClick: updateImageOnClick })));
}
