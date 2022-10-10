import React, { useState, useEffect } from 'react';
import { displayData } from '../../features/displayData';
import { fetchData } from '../../features/fetchData';
import { removeHtmlTags } from '../../features/removeHtmlTag';
import { uploadImageDrupal } from '../../features/uploadImageDrupal';
import './Form.css';
import Modal from '../modal/Modal';
import GenericInputDrupal from '../inputs/generic/GenericInputDrupal';
export function DrupalForm(props) {
    var _a, _b;
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        fetchData(props.open, props.id, props.setDataBeforeIterate, props.drupal_module_url_back);
    }, [props.open]);
    useEffect(() => {
        displayData(props.dataBeforeIterate, props.id, props.dataAfterIterate, props.seDataAfterIterate);
    }, [props.dataBeforeIterate]);
    const handleOpen = () => {
        setIsOpen(!isOpen);
        props.setFormValues({
            field_image: {
                data: {
                    type: 'file-file',
                    id: props.mediaId,
                    meta: {
                        alt: '',
                        title: '',
                    },
                },
            },
        });
    };
    useEffect(() => {
        uploadImageDrupal(props.uploadId, props.setMediaId, props.setFormValues, props.mediaId);
    }, [props.uploadId, props.mediaId]);
    const handleInputsChange = (e, item) => {
        props.setFormValues((item === null || item === void 0 ? void 0 : item.parent) === 'attributes'
            ? Object.assign(Object.assign(Object.assign({}, props.formValues), props.formValues[item === null || item === void 0 ? void 0 : item.ancetre]), { [item === null || item === void 0 ? void 0 : item.key]: e.target.value }) : Object.assign(Object.assign(Object.assign({}, props.formValues), props.formValues[item === null || item === void 0 ? void 0 : item.ancetre]), { [item === null || item === void 0 ? void 0 : item.parent]: e.target.value }));
    };
    return props.emptyArray ? (React.createElement("form", { onSubmit: props.onPatchData, className: "form-cms" }, (_b = (_a = props.emptyArray) === null || _a === void 0 ? void 0 : _a.filter((element) => props.drupal_module_filter.includes(element === null || element === void 0 ? void 0 : element.ancetre) &&
        props.drupal_module_filter.includes(element === null || element === void 0 ? void 0 : element.key))) === null || _b === void 0 ? void 0 :
        _b.map((item, index) => (React.createElement(GenericInputDrupal, { key: index, type: item === null || item === void 0 ? void 0 : item.content, itemAncetre: item === null || item === void 0 ? void 0 : item.ancetre, itemGrandParent: item === null || item === void 0 ? void 0 : item.grandParent, itemParent: item === null || item === void 0 ? void 0 : item.parent, itemKey: item === null || item === void 0 ? void 0 : item.key, rows: typeof (item === null || item === void 0 ? void 0 : item.content) === 'string' && (item === null || item === void 0 ? void 0 : item.content.length) > 35
                ? 5
                : 1, src: `http://localhost${item === null || item === void 0 ? void 0 : item.content}`, label: item === null || item === void 0 ? void 0 : item.key, defaultValue: removeHtmlTags(item === null || item === void 0 ? void 0 : item.content), name: item === null || item === void 0 ? void 0 : item.ancetre, onChange: (e) => handleInputsChange(e, item), value: item === null || item === void 0 ? void 0 : item.content, drupal_boolean_input: props.drupal_boolean_input, drupal_string_input: props.drupal_string_input, drupal_number_input: props.drupal_number_input, drupal_image_field: props.drupal_image_input }))),
        React.createElement("div", { className: "upload-media" },
            React.createElement("button", { className: "button-media" }, "upload media")),
        React.createElement("div", { className: "btn-container" },
            React.createElement("button", { className: "btn-send", type: "button", onClick: props.onClickPreview }, "Preview"),
            React.createElement("button", { className: "btn-send" }, "send")),
        React.createElement(Modal, { open: isOpen, onClick: handleOpen, uploadId: props.uploadId, setUploadId: props.setUploadId, mediaId: props.mediaId, setMediaId: props.setMediaId }))) : (React.createElement("div", null, "Loading..."));
}
