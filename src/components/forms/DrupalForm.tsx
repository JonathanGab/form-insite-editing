import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import './Form.css';
import ModalDrupal from '../modal/ModalDrupal';
import GenericInputDrupal from '../inputs/generic/GenericInputDrupal';
import CircularProgress from '@mui/material/CircularProgress';
import { PropsDrupalForm } from '../../interfaces/PropsDrupalForm';
import { IMap } from '../../interfaces/IMap';
import { DisplayDrupalData } from '../../features/displayData';
import { fetchData } from '../../features/fetchData';
import { removeHtmlTags } from '../../features/removeHtmlTag';
import { uploadImageDrupal } from '../../features/uploadImageDrupal';
import { decryptCodes } from '../../features/encrypt';
import { getDataFromLocalStorage } from '../../features/storage';
type userDataType = {
  email: null | string;
  password: string;
  auth_id: null | string;
};

export function DrupalForm(props: PropsDrupalForm): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [storeId, setStoreId] = useState('');
  const [getRoute, setGetRoute] = useState<null | string>(null);
  const [getImage, setGetImage] = useState<object>({});
  const [storageArray, setStorageArray] = useState([]);
  const [chemin, setChemin] = useState<string>('');
  const [dragAndDropUploadId, setDragAndDropUploadId] = useState<
    string | number
  >('');
  const [mediaId, setMediaId] = useState<string>('');
  const [editFormValues, setEditFormValues] = useState<object | any>({});
  const [editFormMedia, setEditFormMedia] = useState<object>({});
  const [userData, setUserData] = useState<userDataType>({
    email: null,
    password: '',
    auth_id: null,
  });

  //? --------------------------------------------------------------------------------
  //? ---------------------------------- USE EFFECT ----------------------------------
  //? --------------------------------------------------------------------------------
  useEffect(() => {
    fetchData(
      isOpen,
      props.formId,
      props.setDataBeforeIterateFunc,
      props.drupal_module_url_back
    );
  }, [isOpen, props.formId, props.navigation]);

  useEffect(() => {
    DisplayDrupalData(
      props.dataBeforeIterateFunc,
      props.formId,
      props.dataAfterIterateFunc,
      props.seDataAfterIterateFunc,
      props.image_array
    );
  }, [props.dataBeforeIterateFunc]);

  useEffect(() => {
    uploadImageDrupal(
      chemin,
      dragAndDropUploadId,
      setDragAndDropUploadId,
      setEditFormMedia,
      mediaId
    );
  }, [dragAndDropUploadId, mediaId]);

  useEffect(() => {
    if (getImage !== null && getImage !== undefined) {
      updateArrayImage(getRoute as string, getImage);
    }
  }, [getImage]);

  useEffect(() => {
    if (userData !== null || userData !== undefined) {
      getDataFromLocalStorage(setUserData as any);
    }
  }, []);
  //? --------------------------------------------------------------------------------
  //? ------------------------------ EDIT DATA FOR TEXT ------------------------------
  //? --------------------------------------------------------------------------------

  const handleInputsChange = (e: ChangeEvent<HTMLInputElement>, item: any) => {
    setEditFormValues(
      item?.parent === 'attributes'
        ? {
            ...editFormValues,
            ...editFormValues[item?.ancetre],
            [item?.key]: e.target.value,
          }
        : {
            ...editFormValues,
            ...editFormValues[item?.ancetre],
            [item?.parent]: e.target.value,
          }
    );
  };

  //? --------------------------------------------------------------------------------
  //? ------------------------------- CHANGE DATA FOR IMAGE --------------------------
  //? --------------------------------------------------------------------------------

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditFormMedia({
      ...editFormMedia,
      [chemin]: {
        data: {
          type: 'file--file',
          id: mediaId || storeId,
          meta: {
            alt: e.target.value,
          },
        },
      },
    });
  };
  //? --------------------------------------------------------------------------------------------------
  //? --------------------------------- FOR DISPLAY IMAGE AT THE END OF FORM ---------------------------
  //? --------------------------------------------------------------------------------------------------
  const changeIndex = (arr: []) => {
    const sortArray = arr.sort(
      (a: { ancetre: string }, b: { ancetre: string }) =>
        a.ancetre > b.ancetre ? 1 : b.ancetre > a.ancetre ? -1 : 0
    );
    return sortArray;
  };
  //? --------------------------------------------------------------------------------
  //? --------------------------------- UPDATE ARRAY IMAGE ---------------------------
  //? --------------------------------------------------------------------------------

  const updateArrayImage = (route: string, image: any) => {
    let temporaryObj = {
      route,
      ...image?.attributes?.uri,
    };
    return setStorageArray((prevState): any => [...prevState, temporaryObj]);
  };

  //? --------------------------------------------------------------------------------
  //? ------------------------------- DISPLAY IMAGE ON EDIT --------------------------
  //? --------------------------------------------------------------------------------

  const displayOnEdit = (
    array: any[],
    itemAncetre: string,
    itemContent: string
  ) => {
    let result: any = array.find(
      (obj: { route: string }) => obj.route === itemAncetre
    );

    return result?.url
      ? `http://localhost${result?.url}`
      : `http://localhost${itemContent}`;
  };

  const checkLanguage = (content: string) => {
    if (content === props.navigation) {
      return true;
    } else if (props.navigation === '') {
      content = 'fr';
      return true;
    } else {
      return "Veuillez verifier la configuration de la langue dans votre back office Drupal. La langue à été activée sur le site mais pas sur l'article";
    }
  };
  const activeInput = (content: string) => {
    if (content === props.navigation) {
      return false;
    } else if (props.navigation === '') {
      content = 'fr';
      return false;
    } else {
      return true;
    }
  };
  //? --------------------------------------------------------------------------------
  //? --------------------------------- PATCH DATA ---------------------------------
  //? --------------------------------------------------------------------------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      axios.patch(
        props.navigation === ''
          ? `${props.drupal_base_url}/jsonapi/node/article/${props.formId}`
          : `${props.drupal_base_url}/${props.navigation}/jsonapi/node/article/${props.formId}`,
        {
          data: {
            type: 'node--article',
            id: props.formId,
            attributes: editFormValues,
            relationships: editFormMedia,
          },
        },
        {
          headers: {
            Authorization:
              'Basic ' +
              window.btoa(
                `${userData.email}:${decryptCodes(userData.password, 'secret')}`
              ),
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
          },
        }
      );
    } catch (err) {
      console.error({ message: err });
    } finally {
      setMediaId('');
      setDragAndDropUploadId('');
    }
  };
  // --------------------------------------------------------------------------------
  console.log('userData', userData);

  // --------------------------------------------------------------------------------
  return props.emptyArray ? (
    <form onSubmit={handleSubmit} className="form-cms">
      {/* display the validation message */}
      <div className="error_message">
        {props.emptyArray[5]?.key === 'langcode' &&
          checkLanguage(props.emptyArray[5]?.content)}
      </div>
      {changeIndex(props.emptyArray)?.map((item: IMap, index: number) => (
        <GenericInputDrupal
          key={index}
          type={item?.content}
          itemAncetre={item?.ancetre}
          itemParent={item?.parent}
          itemIsImage={item?.isImage}
          itemKey={item?.key}
          //. values of inputs
          value={item?.content}
          disabled={activeInput(props.emptyArray[5]?.content)}
          error={item?.content}
          //? --------------------------------------------------------------------------------
          //? ------------------------------ FILTER IN CONFIG FILE ---------------------------
          //? --------------------------------------------------------------------------------
          //. for filter inside genericInputDrupal
          drupal_boolean_input={props.drupal_boolean_input}
          drupal_string_input={props.drupal_string_input}
          drupal_number_input={props.drupal_number_input}
          //? --------------------------------------------------------------------------------
          //? ------------------------------ ALL FOR TEXT INPUT ------------------------------
          //? --------------------------------------------------------------------------------
          defaultValueTextInput={removeHtmlTags(item?.content)}
          TextInputlabel={
            item?.parent === 'attributes' ? item?.key : item?.parent
          }
          inputLabel={item?.key}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputsChange(e, item)
          }
          //. style of inputs
          rows={
            typeof item?.content === 'string' && item?.content.length > 35
              ? 5
              : 1
          }
          //? --------------------------------------------------------------------------------
          //? -------------------------------  ALL FOR IMAGE ---------------------------------
          //? --------------------------------------------------------------------------------
          labelImageDiv={`image ${item?.ancetre}`}
          defaultValueAlt={item?.alt}
          src={displayOnEdit(storageArray, item.ancetre, item?.content)}
          //. function for edit when click on <img />
          updateImageOnClick={() => {
            setIsOpen(!isOpen);
            setGetRoute(item?.ancetre);
            setChemin(item?.ancetre);
          }}
          onClickImageInput={() => {
            setChemin(item?.ancetre);
            setStoreId(item?.parent);
          }}
          //. for edit input text in image component
          onChangeImageInput={(e: ChangeEvent<HTMLInputElement>) => {
            handleImageChange(e);
          }}
          //? --------------------------------------------------------------------------------
          //? ------------------------------- LOGIN FORM ------------------------------
          //? --------------------------------------------------------------------------------
        />
      ))}

      <div className="btn-container">
        <button
          className="btn-send"
          type="button"
          onClick={props.onClickIsPreview}
        >
          Preview
        </button>
        <button className="btn-send">send</button>
      </div>
      <ModalDrupal
        open={isOpen}
        route_to_media={props.media_url}
        api_url={props.api_url}
        onClick={(e: any) => {
          setIsOpen(!isOpen);
          handleImageChange(e);
        }}
        onClickModal={() => {
          setIsOpen(false);
          setGetRoute(null);
        }}
        setUploadId={setDragAndDropUploadId}
        mediaId={mediaId}
        setMediaId={setMediaId}
        chemin_url={chemin}
        setGetImage={setGetImage}
      />
    </form>
  ) : (
    <div
      style={{
        height: 100 + '%',
        width: 100 + '%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </div>
  );
}
