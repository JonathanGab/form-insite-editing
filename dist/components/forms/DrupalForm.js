import React, { useState, useEffect } from 'react';
import { DisplayDrupalData } from '../../features/displayData';
import { fetchData } from '../../features/fetchData';
import { removeHtmlTags } from '../../features/removeHtmlTag';
import { uploadImageDrupal } from '../../features/uploadImageDrupal';
import './Form.css';
import ModalDrupal from '../modal/ModalDrupal';
import GenericInputDrupal from '../inputs/generic/GenericInputDrupal';
import CircularProgress from '@mui/material/CircularProgress';
export function DrupalForm(props) {
    var _a, _b;
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        fetchData(props.openForm, props.formId, props.setDataBeforeIterateFunc, props.drupal_module_url_back);
    }, [props.openForm]);
    useEffect(() => {
        DisplayDrupalData(props.dataBeforeIterateFunc, props.formId, props.dataAfterIterateFunc, props.seDataAfterIterateFunc);
    }, [props.dataBeforeIterateFunc]);
    const handleOpen = () => {
        setIsOpen(!isOpen);
        props.setEditFormMedia({
            field_image: {
                data: {
                    type: 'file--file',
                    id: props.mediaId,
                    meta: {
                        alt: props.alt,
                        title: props.title,
                    },
                },
            },
        });
    };
    useEffect(() => {
        uploadImageDrupal(props.dragAndDropUploadId, props.setMediaId, props.setEditFormMedia, props.mediaId);
    }, [props.dragAndDropUploadId, props.mediaId]);
    const handleInputsChange = (e, item) => {
        props.setEditFormValues((item === null || item === void 0 ? void 0 : item.parent) === 'attributes'
            ? Object.assign(Object.assign(Object.assign({}, props.editFormValues), props.editFormValues[item === null || item === void 0 ? void 0 : item.ancetre]), { [item === null || item === void 0 ? void 0 : item.key]: e.target.value }) : Object.assign(Object.assign(Object.assign({}, props.editFormValues), props.editFormValues[item === null || item === void 0 ? void 0 : item.ancetre]), { [item === null || item === void 0 ? void 0 : item.parent]: e.target.value }));
    };
    return props.emptyArray ? (React.createElement("form", { onSubmit: props.onPatchData, className: "form-cms" }, (_b = (_a = props.emptyArray) === null || _a === void 0 ? void 0 : _a.filter((element) => props.drupal_module_filter.includes(element === null || element === void 0 ? void 0 : element.ancetre) &&
        props.drupal_module_filter.includes(element === null || element === void 0 ? void 0 : element.key))) === null || _b === void 0 ? void 0 :
        _b.map((item, index) => (React.createElement(GenericInputDrupal, { key: index, type: item === null || item === void 0 ? void 0 : item.content, itemAncetre: item === null || item === void 0 ? void 0 : item.ancetre, itemParent: item === null || item === void 0 ? void 0 : item.parent, itemKey: item === null || item === void 0 ? void 0 : item.key, 
            //. values of inputs
            inputLabel: item === null || item === void 0 ? void 0 : item.key, defaultValue: removeHtmlTags(item === null || item === void 0 ? void 0 : item.content), value: item === null || item === void 0 ? void 0 : item.content, src: `http://localhost${item === null || item === void 0 ? void 0 : item.content}`, 
            //. style of inputs
            rows: typeof (item === null || item === void 0 ? void 0 : item.content) === 'string' && (item === null || item === void 0 ? void 0 : item.content.length) > 35
                ? 5
                : 1, label: item === null || item === void 0 ? void 0 : item.key, name: item === null || item === void 0 ? void 0 : item.ancetre, onChange: (e) => handleInputsChange(e, item), 
            //. for filter inside genericInputDrupal
            drupal_boolean_input: props.drupal_boolean_input, drupal_string_input: props.drupal_string_input, drupal_number_input: props.drupal_number_input, drupal_image_field: props.drupal_image_field, updateImageOnClick: () => setIsOpen(!isOpen) }))),
        React.createElement("div", { className: "btn-container" },
            React.createElement("button", { className: "btn-send", type: "button", onClick: props.onClickIsPreview }, "Preview"),
            React.createElement("button", { className: "btn-send" }, "send")),
        React.createElement(ModalDrupal, { open: isOpen, route_to_media: props.media_url, api_url: props.api_url, onClick: handleOpen, setUploadId: props.setDragAndDropUploadId, mediaId: props.mediaId, setMediaId: props.setMediaId, chemin: props.chemin, setAltText: props.setAlt, setTitle: props.setTitle, title: props.title, altText: props.alt }))) : (React.createElement("div", { style: {
            height: 100 + '%',
            width: 100 + '%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        } },
        React.createElement(CircularProgress, null)));
}
