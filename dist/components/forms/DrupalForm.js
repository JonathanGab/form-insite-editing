import React, { useState, useEffect, } from 'react';
import { DisplayDrupalData } from '../../features/displayData';
import { fetchData } from '../../features/fetchData';
import { removeHtmlTags } from '../../features/removeHtmlTag';
import { uploadImageDrupal } from '../../features/uploadImageDrupal';
import './Form.css';
import ModalDrupal from '../modal/ModalDrupal';
import GenericInputDrupal from '../inputs/generic/GenericInputDrupal';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
export function DrupalForm(props) {
    var _a;
    const [isOpen, setIsOpen] = useState(false);
    const [storeId, setStoreId] = useState('');
    const [getRoute, setGetRoute] = useState(null);
    const [getImage, setGetImage] = useState({});
    const [storageArray, setStorageArray] = useState([]);
    const [chemin, setChemin] = useState('');
    const [uploadId, setUploadId] = useState('');
    const [mediaId, setMediaId] = useState('');
    const [formValues, setFormValues] = useState({});
    const [editFormMedia, setEditFormMedia] = useState({});
    //? --------------------------------------------------------------------------------
    //? ---------------------------------- USE EFFECT ----------------------------------
    //? --------------------------------------------------------------------------------
    useEffect(() => {
        fetchData(isOpen, props.formId, props.setDataBeforeIterateFunc, props.drupal_module_url_back);
    }, [isOpen, props.formId, props.navigation]);
    useEffect(() => {
        DisplayDrupalData(props.dataBeforeIterateFunc, props.formId, props.dataAfterIterateFunc, props.seDataAfterIterateFunc, props.image_array);
    }, [props.dataBeforeIterateFunc]);
    useEffect(() => {
        uploadImageDrupal(chemin, uploadId, setMediaId, setEditFormMedia, mediaId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uploadId, mediaId]);
    useEffect(() => {
        if (getImage !== null && getImage !== undefined) {
            updateArrayImage(getRoute, getImage);
        }
    }, [getImage]);
    //? --------------------------------------------------------------------------------
    //? ------------------------------ SUBMIT DATA ------------------------------
    //? --------------------------------------------------------------------------------
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios.patch(props.navigation === ''
                ? `${props.drupal_base_url}/jsonapi/node/article/${props.formId}`
                : `${props.drupal_base_url}/${props.navigation}/jsonapi/node/article/${props.formId}`, {
                data: {
                    type: 'node--article',
                    id: props.formId,
                    attributes: formValues,
                    relationships: editFormMedia,
                },
            }, {
                headers: {
                    Authorization: 'Basic ' + window.btoa(`${props.user}:${props.user_mdp}`),
                    Accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                },
            });
        }
        catch (err) {
            console.error({ message: err });
        }
        finally {
            setMediaId('');
            setUploadId('');
        }
    };
    //? --------------------------------------------------------------------------------
    //? ------------------------------ EDIT DATA FOR TEXT ------------------------------
    //? --------------------------------------------------------------------------------
    const handleInputsChange = (e, item) => {
        setFormValues((item === null || item === void 0 ? void 0 : item.parent) === 'attributes'
            ? Object.assign(Object.assign(Object.assign({}, formValues), formValues[item === null || item === void 0 ? void 0 : item.ancetre]), { [item === null || item === void 0 ? void 0 : item.key]: e.target.value }) : Object.assign(Object.assign(Object.assign({}, formValues), formValues[item === null || item === void 0 ? void 0 : item.ancetre]), { [item === null || item === void 0 ? void 0 : item.parent]: e.target.value }));
    };
    //? --------------------------------------------------------------------------------
    //? ------------------------------- CHANGE DATA FOR IMAGE --------------------------
    //? --------------------------------------------------------------------------------
    const handleImageChange = (e) => {
        var _a, _b;
        setEditFormMedia(Object.assign(Object.assign({}, editFormMedia), { [chemin]: {
                data: {
                    type: 'file--file',
                    id: mediaId || storeId,
                    meta: {
                        alt: (_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.value,
                        title: (_b = e === null || e === void 0 ? void 0 : e.target) === null || _b === void 0 ? void 0 : _b.value,
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
        if (storageArray.find((obj) => obj.route === route)) {
            const filteredStorageArray = storageArray.map((obj) => obj.route === route ? temporaryObj : obj);
            return setStorageArray(filteredStorageArray);
        }
        else {
            //  else add object
            return setStorageArray((prevState) => [...prevState, temporaryObj]);
        }
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
    // console.log('editFormMedia', editFormMedia);
    // console.log('formValues', formValues);
    console.log('mediaId', mediaId);
    return props.emptyArray ? (React.createElement("form", { onSubmit: handleSubmit, className: "form-cms" }, (_a = changeIndex(props.emptyArray)) === null || _a === void 0 ? void 0 :
        _a.map((item, index) => (React.createElement(GenericInputDrupal, { key: index, type: item === null || item === void 0 ? void 0 : item.content, itemAncetre: item === null || item === void 0 ? void 0 : item.ancetre, itemParent: item === null || item === void 0 ? void 0 : item.parent, itemIsImage: item === null || item === void 0 ? void 0 : item.isImage, itemKey: item === null || item === void 0 ? void 0 : item.key, 
            //. ---------------------------------------
            //. values of inputs
            //. ---------------------------------------
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
            //. ---------------------------------------
            //. ----------- style of inputs -----------
            //. ---------------------------------------
            rows: typeof (item === null || item === void 0 ? void 0 : item.content) === 'string' && (item === null || item === void 0 ? void 0 : item.content.length) > 35
                ? 5
                : 1, 
            //? --------------------------------------------------------------------------------
            //? -------------------------------  ALL FOR IMAGE ---------------------------------
            //? --------------------------------------------------------------------------------
            labelImageDiv: `image ${item === null || item === void 0 ? void 0 : item.ancetre}`, defaultValueAlt: item === null || item === void 0 ? void 0 : item.alt, src: displayOnEdit(storageArray, item.ancetre, item === null || item === void 0 ? void 0 : item.content), 
            //. ---------------------------------------
            //. function for edit when click on <img />
            //. ---------------------------------------
            updateImageOnClick: () => {
                setIsOpen(!isOpen);
                setGetRoute(item === null || item === void 0 ? void 0 : item.ancetre);
                setChemin(item === null || item === void 0 ? void 0 : item.ancetre);
            }, onClickImageInput: () => {
                setChemin(item === null || item === void 0 ? void 0 : item.ancetre);
                setStoreId(item === null || item === void 0 ? void 0 : item.parent);
            }, 
            //. ---------------------------------------
            //. for edit input text in image component
            //. ---------------------------------------
            onChangeImageInput: (e) => {
                handleImageChange(e);
            } }))),
        React.createElement("div", { className: "btn-container" },
            React.createElement("button", { className: "btn-send", type: "button", onClick: props.onClickIsPreview }, "Preview"),
            React.createElement("button", { className: "btn-send" }, "send")),
        React.createElement(ModalDrupal, { open: isOpen, route_to_media: props.media_url, api_url: props.api_url, onClick: (e) => {
                handleImageChange(e);
                setIsOpen(!isOpen);
            }, onClose: () => {
                setIsOpen(false);
                setGetRoute(null);
            }, setUploadId: setUploadId, mediaId: mediaId, setMediaId: setMediaId, chemin_url: chemin, setGetImage: setGetImage }))) : (React.createElement("div", { className: "loader" },
        React.createElement(CircularProgress, null)));
}
