var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import './Modal.css';
import Upload from '../upload/Upload';
import TextField from '@mui/material/TextField';
export default function Modal(props) {
    const [altText, setAltText] = useState('');
    const [legend, setLegend] = useState('');
    const [description, setDescription] = useState('');
    const [medias, setMedias] = useState([]);
    const [files, setFiles] = useState(null);
    useEffect(() => {
        axios
            .get('http://localhost/module/wp-json/wp/v2/media?per_page=100')
            .then((res) => setMedias(res.data))
            .catch((err) => console.error(err));
    }, []);
    const postImage = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', files);
        formData.append('alt_text', altText);
        formData.append('description', description);
        formData.append('caption', legend);
        try {
            const document = yield axios.post('http://localhost/module/wp-json/wp/v2/media', formData, {
                headers: {
                    'content-disposition': `attachment; filename="image.png"`,
                    'Content-Type': 'image/png',
                    Accept: '*/*',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            props.setUploadId(document.data);
        }
        catch (err) {
            console.error(err);
        }
    });
    return (React.createElement("div", { className: props.open ? 'mod_open_container' : 'mod_close_container' },
        React.createElement("div", { className: "modal" },
            React.createElement("div", { className: "mod_padding" },
                React.createElement("div", { className: "close_btn" },
                    React.createElement("div", { className: "mod_close_btn", onClick: props.onClick }, "x")),
                React.createElement("div", { className: "mod_header" },
                    React.createElement("div", null,
                        React.createElement("h1", null, "S\u00E9lectionnez un m\u00E9dia")),
                    React.createElement("div", { className: "mod_filter_search" },
                        React.createElement("button", null, "Filtre"),
                        " ",
                        React.createElement("input", { type: "text" }))),
                React.createElement("div", { className: "mod_wrapper" },
                    React.createElement("div", { className: "mod_direction" },
                        React.createElement("div", { className: "mod_grid" }, medias.map((i) => (React.createElement("div", { className: "mod_box", key: i.id },
                            React.createElement("img", { src: i.guid.rendered, alt: "", className: "mod_img", onClick: () => props.setMediaId(i.id) })))))),
                    React.createElement("div", { className: "mod_btn_send" },
                        React.createElement("button", { onClick: props.onClick, className: "btn_send" }, "Valider")),
                    React.createElement("div", { className: "divider" },
                        React.createElement("div", { className: "divider_text" }, "OU")),
                    React.createElement("div", { className: "mod_upload_container" },
                        React.createElement("h1", null, "Uploader un m\u00E9dia"),
                        React.createElement("div", { className: "mod_upload_block" },
                            React.createElement("div", { className: "mod_upload_left" },
                                React.createElement(Upload, { files: files, setFiles: setFiles })),
                            React.createElement("div", { className: "mod_upload_right" },
                                React.createElement("div", { className: "mod_update_input" },
                                    React.createElement(TextField, { id: "outlined-name", label: "alt", value: altText, onChange: (e) => setAltText(e.target.value) })),
                                React.createElement("div", { className: "mod_update_input" },
                                    React.createElement(TextField, { id: "outlined-name", label: "legend", onChange: (e) => setLegend(e.target.value), value: legend })),
                                React.createElement("div", { className: "mod_update_input" },
                                    React.createElement(TextField, { id: "outlined-name", label: "description", onChange: (e) => setDescription(e.target.value), value: description })))),
                        React.createElement("div", { className: "mod_btn_send" },
                            React.createElement("button", { className: "btn_send", onClick: (e) => {
                                    postImage(e);
                                    props.onClick();
                                } }, "Valider"))))))));
}
