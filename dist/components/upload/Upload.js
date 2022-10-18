import React, { useRef, useState, } from 'react';
import './Upload.css';
export default function Upload(props) {
    var _a;
    const [img, setImg] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    // drag state
    const [dragActive, setDragActive] = useState(false);
    // ref
    const inputRef = useRef(null);
    const handleFile = (file) => {
        //you can carry out any file validations here...
        setImg(file);
        setPreviewUrl(URL.createObjectURL(file));
    };
    // handle drag events
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        }
        else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };
    // triggers when file is dropped
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        let imageFile = e.dataTransfer.files[0];
        handleFile(imageFile);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            props.setFiles(e.dataTransfer.files[0]);
        }
    };
    // triggers when file is selected with click
    const handleChange = (e) => {
        const target = e.target;
        const file = target.files[0];
        e.preventDefault();
        if (e.target.files && file) {
            props.setFiles(file);
        }
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setPreviewUrl(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };
    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };
    return (React.createElement("div", { className: "upload-file-container" },
        React.createElement("div", { id: "form-file-upload", onDragEnter: handleDrag },
            React.createElement("input", { ref: inputRef, type: "file", id: "input-file-upload", multiple: false, onChange: handleChange }),
            React.createElement("label", { id: "label-file-upload", htmlFor: "input-file-upload", className: dragActive ? 'drag-active' : '' },
                React.createElement("div", null,
                    React.createElement("p", null, "Drag and drop your file here or click"),
                    React.createElement("button", { className: "upload-button", onClick: onButtonClick }, "Upload a file"))),
            dragActive && (React.createElement("div", { id: "drag-file-element", onDragEnter: handleDrag, onDragLeave: handleDrag, onDragOver: handleDrag, onDrop: (e) => {
                    handleDrop(e);
                } }))),
        previewUrl && (React.createElement("div", { className: "upload_img_box" },
            React.createElement("img", { src: previewUrl, alt: "", id: "img", className: "img" }),
            React.createElement("p", null, (_a = props.files) === null || _a === void 0 ? void 0 : _a.name)))));
}
