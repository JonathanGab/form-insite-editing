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
export default function ModalDrupal(props) {
    const [medias, setMedias] = useState([]);
    const [files, setFiles] = useState(null);
    useEffect(() => {
        axios
            .get(props.route_to_media)
            .then((res) => { var _a; return setMedias((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.data); })
            .catch((err) => console.error(err));
    }, []);
    const postImage = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        try {
            const document = yield axios.post(props.api_url + 'article/' + props.chemin_url, files, {
                headers: {
                    Accept: 'application/vnd.api+json',
                    'Content-Type': 'application/octet-stream',
                    'Content-Disposition': 'file; filename="test.png"',
                    Authorization: 'Basic ' + window.btoa(`dx_admin:Vavaskale69!`),
                },
            });
            props.setUploadId(document.data.data);
        }
        catch (err) {
            console.error(err);
        }
    });
    return (React.createElement("div", { className: props.open ? 'mod_open_container' : 'mod_close_container' },
        React.createElement("div", { className: "modal" },
            React.createElement("div", { className: "mod_padding" },
                React.createElement("div", { className: "close_btn" },
                    React.createElement("div", { className: "mod_close_btn", onClick: props.onClickModal }, "x")),
                React.createElement("div", { className: "mod_header" },
                    React.createElement("div", null,
                        React.createElement("h1", null, "S\u00E9lectionnez un m\u00E9dia")),
                    React.createElement("div", { className: "mod_filter_search" },
                        React.createElement("button", null, "Filtre"),
                        " ",
                        React.createElement("input", { type: "text" }))),
                React.createElement("div", { className: "mod_wrapper" },
                    React.createElement("div", { className: "mod_direction" },
                        React.createElement("div", { className: "mod_grid" }, medias === null || medias === void 0 ? void 0 : medias.map((i) => {
                            var _a, _b;
                            return (React.createElement("div", { className: "mod_box", key: i.id },
                                React.createElement("img", { src: 'http://localhost' + ((_b = (_a = i === null || i === void 0 ? void 0 : i.attributes) === null || _a === void 0 ? void 0 : _a.uri) === null || _b === void 0 ? void 0 : _b.url), alt: "", className: "mod_img", onClick: () => {
                                        props.setMediaId(i.id);
                                        props.setGetImage(i);
                                    } })));
                        }))),
                    React.createElement("div", { className: "mod_btn_send" },
                        React.createElement("button", { onClick: props.onClick, type: "button", className: "btn_send" }, "Valider")),
                    React.createElement("div", { className: "divider" },
                        React.createElement("div", { className: "divider_text" }, "OU")),
                    React.createElement("div", { className: "mod_upload_container" },
                        React.createElement("h1", null, "Uploader un m\u00E9dia"),
                        React.createElement("div", { className: "mod_upload_block" },
                            React.createElement("div", { className: "mod_upload_left" },
                                React.createElement(Upload, { files: files, setFiles: setFiles }))),
                        React.createElement("div", { className: "mod_btn_send" },
                            React.createElement("button", { className: "btn_send", onClick: (e) => {
                                    postImage(e);
                                    props.onClick(e);
                                } }, "Valider"))))))));
}
