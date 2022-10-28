import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Form.css';
import ModalDrupal from '../modal/ModalDrupal';
import GenericInputDrupal from '../inputs/generic/GenericInputDrupal';
import CircularProgress from '@mui/material/CircularProgress';
import { DisplayDrupalData } from '../../features/displayData';
import { fetchData } from '../../features/fetchData';
import { removeHtmlTags } from '../../features/removeHtmlTag';
import { uploadImageDrupal } from '../../features/uploadImageDrupal';
import { decryptCodes } from '../../features/encrypt';
import { getDataFromLocalStorage } from '../../features/storage';
export function DrupalForm(props) {
    var _a, _b, _c;
    const [isOpen, setIsOpen] = useState(false);
    const [storeId, setStoreId] = useState('');
    const [getRoute, setGetRoute] = useState(null);
    const [getImage, setGetImage] = useState({});
    const [storageArray, setStorageArray] = useState([]);
    const [chemin, setChemin] = useState('');
    const [dragAndDropUploadId, setDragAndDropUploadId] = useState('');
    const [mediaId, setMediaId] = useState('');
    const [editFormValues, setEditFormValues] = useState({});
    const [editFormMedia, setEditFormMedia] = useState({});
    const [userData, setUserData] = useState({
        email: null,
        password: '',
        auth_id: null,
    });
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
        uploadImageDrupal(chemin, dragAndDropUploadId, setDragAndDropUploadId, setEditFormMedia, mediaId);
    }, [dragAndDropUploadId, mediaId]);
    useEffect(() => {
        if (getImage !== null && getImage !== undefined) {
            updateArrayImage(getRoute, getImage);
        }
    }, [getImage]);
    useEffect(() => {
        if (userData !== null || userData !== undefined) {
            getDataFromLocalStorage(setUserData);
        }
    }, []);
    //? --------------------------------------------------------------------------------
    //? ------------------------------ EDIT DATA FOR TEXT ------------------------------
    //? --------------------------------------------------------------------------------
    const handleInputsChange = (e, item) => {
        setEditFormValues((item === null || item === void 0 ? void 0 : item.parent) === 'attributes'
            ? Object.assign(Object.assign(Object.assign({}, editFormValues), editFormValues[item === null || item === void 0 ? void 0 : item.ancetre]), { [item === null || item === void 0 ? void 0 : item.key]: e.target.value }) : Object.assign(Object.assign(Object.assign({}, editFormValues), editFormValues[item === null || item === void 0 ? void 0 : item.ancetre]), { [item === null || item === void 0 ? void 0 : item.parent]: e.target.value }));
    };
    //? --------------------------------------------------------------------------------
    //? ------------------------------- CHANGE DATA FOR IMAGE --------------------------
    //? --------------------------------------------------------------------------------
    const handleImageChange = (e) => {
        setEditFormMedia(Object.assign(Object.assign({}, editFormMedia), { [chemin]: {
                data: {
                    type: 'file--file',
                    id: mediaId || storeId,
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
    const checkLanguage = (content) => {
        if (content === props.navigation) {
            return true;
        }
        else if (props.navigation === '') {
            content = 'fr';
            return true;
        }
        else {
            return "Veuillez verifier la configuration de la langue dans votre back office Drupal. La langue à été activée sur le site mais pas sur l'article";
        }
    };
    const activeInput = (content) => {
        if (content === props.navigation) {
            return false;
        }
        else if (props.navigation === '') {
            content = 'fr';
            return false;
        }
        else {
            return true;
        }
    };
    //? --------------------------------------------------------------------------------
    //? --------------------------------- PATCH DATA ---------------------------------
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
                    attributes: editFormValues,
                    relationships: editFormMedia,
                },
            }, {
                headers: {
                    Authorization: 'Basic ' +
                        window.btoa(`${userData.email}:${decryptCodes(userData.password, 'secret')}`),
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
            setDragAndDropUploadId('');
        }
    };
    // --------------------------------------------------------------------------------
    console.log('userData', userData);
    // --------------------------------------------------------------------------------
    return props.emptyArray ? (React.createElement("form", { onSubmit: handleSubmit, className: "form-cms" },
        React.createElement("div", { className: "error_message" }, ((_a = props.emptyArray[5]) === null || _a === void 0 ? void 0 : _a.key) === 'langcode' &&
            checkLanguage((_b = props.emptyArray[5]) === null || _b === void 0 ? void 0 : _b.content)), (_c = changeIndex(props.emptyArray)) === null || _c === void 0 ? void 0 :
        _c.map((item, index) => {
            var _a;
            return (React.createElement(GenericInputDrupal, { key: index, type: item === null || item === void 0 ? void 0 : item.content, itemAncetre: item === null || item === void 0 ? void 0 : item.ancetre, itemParent: item === null || item === void 0 ? void 0 : item.parent, itemIsImage: item === null || item === void 0 ? void 0 : item.isImage, itemKey: item === null || item === void 0 ? void 0 : item.key, 
                //. values of inputs
                value: item === null || item === void 0 ? void 0 : item.content, disabled: activeInput((_a = props.emptyArray[5]) === null || _a === void 0 ? void 0 : _a.content), error: item === null || item === void 0 ? void 0 : item.content, 
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
                    setChemin(item === null || item === void 0 ? void 0 : item.ancetre);
                }, onClickImageInput: () => {
                    setChemin(item === null || item === void 0 ? void 0 : item.ancetre);
                    setStoreId(item === null || item === void 0 ? void 0 : item.parent);
                }, 
                //. for edit input text in image component
                onChangeImageInput: (e) => {
                    handleImageChange(e);
                } }));
        }),
        React.createElement("div", { className: "btn-container" },
            React.createElement("button", { className: "btn-send", type: "button", onClick: props.onClickIsPreview }, "Preview"),
            React.createElement("button", { className: "btn-send" }, "send")),
        React.createElement(ModalDrupal, { open: isOpen, route_to_media: props.media_url, api_url: props.api_url, onClick: (e) => {
                setIsOpen(!isOpen);
                handleImageChange(e);
            }, onClickModal: () => {
                setIsOpen(false);
                setGetRoute(null);
            }, setUploadId: setDragAndDropUploadId, mediaId: mediaId, setMediaId: setMediaId, chemin_url: chemin, setGetImage: setGetImage }))) : (React.createElement("div", { style: {
            height: 100 + '%',
            width: 100 + '%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        } },
        React.createElement(CircularProgress, null)));
}
