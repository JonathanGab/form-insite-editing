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
    var _a;
    const [isOpen, setIsOpen] = useState(false);
    const [getRoute, setGetRoute] = useState(null);
    const [storeId, setStoreId] = useState('');
    const [getImage, setGetImage] = useState({});
    const [storageArray, setStorageArray] = useState([]);
    //? --------------------------------------------------------------------------------
    //? ---------------------------------- USE EFFECT ----------------------------------
    //? --------------------------------------------------------------------------------
    useEffect(() => {
        fetchData(props.openForm, props.formId, props.setDataBeforeIterateFunc, props.drupal_module_url_back);
    }, [props.openForm, props.formId, props.navigation]);
    useEffect(() => {
        DisplayDrupalData(props.dataBeforeIterateFunc, props.formId, props.dataAfterIterateFunc, props.seDataAfterIterateFunc, props.image_array);
    }, [props.dataBeforeIterateFunc]);
    useEffect(() => {
        uploadImageDrupal(props.chemin_url, props.dragAndDropUploadId, props.setMediaId, props.setEditFormMedia, props.mediaId);
    }, [props.dragAndDropUploadId, props.mediaId]);
    useEffect(() => {
        if (getImage !== null && getImage !== undefined) {
            updateArrayImage(getRoute, getImage);
        }
    }, [getImage]);
    //? --------------------------------------------------------------------------------
    //? ------------------------------ EDIT DATA FOR TEXT ------------------------------
    //? --------------------------------------------------------------------------------
    const handleInputsChange = (e, item) => {
        props.setEditFormValues((item === null || item === void 0 ? void 0 : item.parent) === 'attributes'
            ? Object.assign(Object.assign(Object.assign({}, props.editFormValues), props.editFormValues[item === null || item === void 0 ? void 0 : item.ancetre]), { [item === null || item === void 0 ? void 0 : item.key]: e.target.value }) : Object.assign(Object.assign(Object.assign({}, props.editFormValues), props.editFormValues[item === null || item === void 0 ? void 0 : item.ancetre]), { [item === null || item === void 0 ? void 0 : item.parent]: e.target.value }));
    };
    //? --------------------------------------------------------------------------------
    //? ------------------------------- CHANGE DATA FOR IMAGE --------------------------
    //? --------------------------------------------------------------------------------
    const handleImageChange = (e) => {
        props.setEditFormMedia(Object.assign(Object.assign({}, props.editFormMedia), { [props.chemin]: {
                data: {
                    type: 'file--file',
                    id: props.mediaId || storeId,
                    meta: {
                        alt: e.target.value,
                    },
                },
            } }));
    };
    //? --------------------------------------------------------------------------------------------------
    //? --------------------------------- FOR DISPLAY IMAGE AT THE END OF FORM ---------------------------
    //? --------------------------------------------------------------------------------------------------
    const changeIndex = (arr) => {
        const sortArray = arr.sort((a, b) => a.ancetre > b.ancetre ? 1 : b.ancetre > a.ancetre ? -1 : 0);
        return sortArray;
    };
    //? --------------------------------------------------------------------------------
    //? --------------------------------- UPDATE ARRAY IMAGE ---------------------------
    //? --------------------------------------------------------------------------------
    const updateArrayImage = (route, image) => {
        var _a;
        let temporaryObj = Object.assign({ route }, (_a = image === null || image === void 0 ? void 0 : image.attributes) === null || _a === void 0 ? void 0 : _a.uri);
        return setStorageArray((prevState) => [...prevState, temporaryObj]);
    };
    //? --------------------------------------------------------------------------------
    //? ------------------------------- DISPLAY IMAGE ON EDIT --------------------------
    //? --------------------------------------------------------------------------------
    const displayOnEdit = (array, itemAncetre, itemContent) => {
        let result = array.find((obj) => obj.route === itemAncetre);
        return (result === null || result === void 0 ? void 0 : result.url)
            ? `http://localhost${result === null || result === void 0 ? void 0 : result.url}`
            : `http://localhost${itemContent}`;
    };
    console.log(isOpen);
    return props.emptyArray ? (React.createElement("form", { onSubmit: props.onPatchData, className: "form-cms" }, (_a = changeIndex(props.emptyArray)) === null || _a === void 0 ? void 0 :
        _a.map((item, index) => (React.createElement(GenericInputDrupal, { key: index, type: item === null || item === void 0 ? void 0 : item.content, itemAncetre: item === null || item === void 0 ? void 0 : item.ancetre, itemParent: item === null || item === void 0 ? void 0 : item.parent, itemIsImage: item === null || item === void 0 ? void 0 : item.isImage, itemKey: item === null || item === void 0 ? void 0 : item.key, 
            //. values of inputs
            value: item === null || item === void 0 ? void 0 : item.content, 
            //? --------------------------------------------------------------------------------
            //? ------------------------------ FILTER IN CONFIG FILE ---------------------------
            //? --------------------------------------------------------------------------------
            //. for filter inside genericInputDrupal
            drupal_boolean_input: props.drupal_boolean_input, drupal_string_input: props.drupal_string_input, drupal_number_input: props.drupal_number_input, 
            //? --------------------------------------------------------------------------------
            //? ------------------------------ ALL FOR TEXT INPUT ------------------------------
            //? --------------------------------------------------------------------------------
            defaultValueTextInput: removeHtmlTags(item === null || item === void 0 ? void 0 : item.content), TextInputlabel: (item === null || item === void 0 ? void 0 : item.parent) === 'attributes' ? item === null || item === void 0 ? void 0 : item.key : item === null || item === void 0 ? void 0 : item.parent, inputLabel: item === null || item === void 0 ? void 0 : item.key, onChange: (e) => handleInputsChange(e, item), 
            //. style of inputs
            rows: typeof (item === null || item === void 0 ? void 0 : item.content) === 'string' && (item === null || item === void 0 ? void 0 : item.content.length) > 35
                ? 5
                : 1, 
            //? --------------------------------------------------------------------------------
            //? -------------------------------  ALL FOR IMAGE ---------------------------------
            //? --------------------------------------------------------------------------------
            labelImageDiv: `image ${item === null || item === void 0 ? void 0 : item.ancetre}`, defaultValueAlt: item === null || item === void 0 ? void 0 : item.alt, src: displayOnEdit(storageArray, item.ancetre, item === null || item === void 0 ? void 0 : item.content), 
            //. function for edit when click on <img />
            updateImageOnClick: () => {
                setIsOpen(!isOpen);
                setGetRoute(item === null || item === void 0 ? void 0 : item.ancetre);
                props.setChemin(item === null || item === void 0 ? void 0 : item.ancetre);
            }, onClickImageInput: () => {
                props.setChemin(item === null || item === void 0 ? void 0 : item.ancetre);
                setStoreId(item === null || item === void 0 ? void 0 : item.parent);
            }, 
            //. for edit input text in image component
            onChangeImageInput: (e) => {
                handleImageChange(e);
            } }))),
        React.createElement("div", { className: "btn-container" },
            React.createElement("button", { className: "btn-send", type: "button", onClick: props.onClickIsPreview }, "Preview"),
            React.createElement("button", { className: "btn-send" }, "send")),
        React.createElement(ModalDrupal, { open: isOpen, route_to_media: props.media_url, api_url: props.api_url, onClick: (e) => {
                setIsOpen(!isOpen);
                handleImageChange(e);
            }, setUploadId: props.setDragAndDropUploadId, mediaId: props.mediaId, setMediaId: props.setMediaId, altText: props.alt, setAltText: props.setAlt, chemin_url: props.chemin_url, setGetImage: setGetImage }))) : (React.createElement("div", { style: {
            height: 100 + '%',
            width: 100 + '%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        } },
        React.createElement(CircularProgress, null)));
}
