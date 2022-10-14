import React, { useState, useEffect } from 'react';
import { displayData } from '../../features/displayData';
import { fetchData } from '../../features/fetchData';
import { removeHtmlTags } from '../../features/removeHtmlTag';
import Modal from '../modal/Modal';
import './Form.css';
import { uploadImageWordPress } from '../../features/uploadImageWordPress';
import GenericInputWordPress from '../inputs/generic/GenericInputWordPress';
export const WordPressForm = (props) => {
    var _a, _b;
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        fetchData(props.openForm, props.formId, props.seDataAfterIterateFunc, props.wordpress_module_url_back);
    }, [props.openForm]);
    useEffect(() => {
        displayData(props.dataBeforeIterateFunc, props.formId, props.dataAfterIterateFunc, props.seDataAfterIterateFunc);
    }, [props.dataBeforeIterateFunc]);
    const handleOpen = () => {
        setIsOpen(!isOpen);
        props.setEditFormValues(Object.assign(Object.assign({}, props.editFormValues), { featured_media: props.mediaId }));
    };
    useEffect(() => {
        uploadImageWordPress(props.dragAndDropUploadId, props.setMediaId, props.setEditFormValues, props.editFormValues, props.mediaId);
    }, [props.dragAndDropUploadId, props.mediaId]);
    const handleInputChagne = (e, item) => {
        props.setEditFormValues(Object.assign(Object.assign({}, props.editFormValues), { [item.ancetre]: (item === null || item === void 0 ? void 0 : item.ancetre) === props.custom_fields
                ? Object.assign(Object.assign({}, props.editFormValues[item.ancetre]), { [item === null || item === void 0 ? void 0 : item.key]: e.target.value }) : e.target.value, status: props.draft }));
    };
    return props.emptyArray ? (React.createElement("div", { className: "form-container" },
        props.langague,
        " HI",
        React.createElement("form", { onSubmit: props.onPatchData, className: "form" }, (_b = (_a = props.emptyArray) === null || _a === void 0 ? void 0 : _a.filter((element) => props.wordpress_module_filter.includes(element === null || element === void 0 ? void 0 : element.ancetre) &&
            props.wordpress_module_filter.includes(element === null || element === void 0 ? void 0 : element.key))) === null || _b === void 0 ? void 0 :
            _b.map((item, index) => (React.createElement(GenericInputWordPress, { key: index, type: item === null || item === void 0 ? void 0 : item.content, itemAncetre: item === null || item === void 0 ? void 0 : item.ancetre, itemParent: item === null || item === void 0 ? void 0 : item.parent, itemKey: item === null || item === void 0 ? void 0 : item.key, rows: typeof (item === null || item === void 0 ? void 0 : item.content) === 'string' && (item === null || item === void 0 ? void 0 : item.content.length) > 35
                    ? 5
                    : 1, defaultValue: removeHtmlTags(item === null || item === void 0 ? void 0 : item.content), src: item === null || item === void 0 ? void 0 : item.content, label: item.key === 'rendered' ? item === null || item === void 0 ? void 0 : item.ancetre : item === null || item === void 0 ? void 0 : item.key, name: item === null || item === void 0 ? void 0 : item.ancetre, onChange: (e) => {
                    handleInputChagne(e, item);
                } }))),
            React.createElement("div", { className: "upload-media" },
                React.createElement("button", { className: "button-media", type: "button", onClick: handleOpen }, "upload media")),
            React.createElement("div", { className: "btn-container" },
                React.createElement("button", { className: "btn-send", type: "button", onClick: props.onClickIsPreview }, "Preview"),
                React.createElement("button", { className: "btn-send" }, "send")),
            React.createElement(Modal, { open: isOpen, onClick: handleOpen, uploadId: props.dragAndDropUploadId, setUploadId: props.setDragAndDropUploadId, mediaId: props.mediaId, setMediaId: props.setMediaId })))) : (React.createElement("div", null, "Loading..."));
};
