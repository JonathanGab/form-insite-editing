import React, {
  useState,
  useEffect,
  ChangeEvent,
  MouseEvent,
  FormEvent,
} from 'react';
import { PropsDrupalForm } from '../../interfaces/PropsDrupalForm';
import { IMap } from '../../interfaces/IMap';
import { DisplayDrupalData } from '../../features/displayData';
import { fetchData } from '../../features/fetchData';
import { removeHtmlTags } from '../../features/removeHtmlTag';
import { uploadImageDrupal } from '../../features/uploadImageDrupal';
import './Form.css';
import ModalDrupal from '../modal/ModalDrupal';
import GenericInputDrupal from '../inputs/generic/GenericInputDrupal';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

export function DrupalForm(props: PropsDrupalForm): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [storeId, setStoreId] = useState('');
  const [getRoute, setGetRoute] = useState<null | string>(null);
  const [getImage, setGetImage] = useState<object>({});
  const [storageArray, setStorageArray] = useState([]);
  const [chemin, setChemin] = useState<string>('');
  const [uploadId, setUploadId] = useState<string>('');
  const [mediaId, setMediaId] = useState<string | number>('');
  const [formValues, setFormValues] = useState<object | any>({});
  const [editFormMedia, setEditFormMedia] = useState<object>({});
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
    uploadImageDrupal(chemin, uploadId, setMediaId, setEditFormMedia, mediaId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadId, mediaId]);

  useEffect(() => {
    if (getImage !== null && getImage !== undefined) {
      updateArrayImage(getRoute as string, getImage);
    }
  }, [getImage]);

  //? --------------------------------------------------------------------------------
  //? ------------------------------ SUBMIT DATA ------------------------------
  //? --------------------------------------------------------------------------------

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
            attributes: formValues,
            relationships: editFormMedia,
          },
        },
        {
          headers: {
            Authorization:
              'Basic ' + window.btoa(`${props.user}:${props.user_mdp}`),
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
          },
        }
      );
    } catch (err) {
      console.error({ message: err });
    } finally {
      setMediaId('');
      setUploadId('');
    }
  };

  //? --------------------------------------------------------------------------------
  //? ------------------------------ EDIT DATA FOR TEXT ------------------------------
  //? --------------------------------------------------------------------------------

  const handleInputsChange = (e: ChangeEvent<HTMLInputElement>, item: any) => {
    setFormValues(
      item?.parent === 'attributes'
        ? {
            ...formValues,
            ...formValues[item?.ancetre],
            [item?.key]: e.target.value,
          }
        : {
            ...formValues,
            ...formValues[item?.ancetre],
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
            alt: e?.target?.value,
            title: e?.target?.value,
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

    if (storageArray.find((obj: { route: string }) => obj.route === route)) {
      const filteredStorageArray = storageArray.map((obj: { route: string }) =>
        obj.route === route ? temporaryObj : obj
      );
      return setStorageArray(filteredStorageArray as []);
    } else {
      //  else add object
      return setStorageArray((prevState): any => [...prevState, temporaryObj]);
    }
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

  // console.log('editFormMedia', editFormMedia);
  // console.log('formValues', formValues);
  console.log('mediaId', mediaId);

  return props.emptyArray ? (
    <form onSubmit={handleSubmit} className="form-cms">
      {changeIndex(props.emptyArray)?.map((item: IMap, index: number) => (
        <GenericInputDrupal
          key={index}
          type={item?.content}
          itemAncetre={item?.ancetre}
          itemParent={item?.parent}
          itemIsImage={item?.isImage}
          itemKey={item?.key}
          //. ---------------------------------------
          //. values of inputs
          //. ---------------------------------------
          value={item?.content}
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
          //. ---------------------------------------
          //. ----------- style of inputs -----------
          //. ---------------------------------------
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
          //. ---------------------------------------
          //. function for edit when click on <img />
          //. ---------------------------------------
          updateImageOnClick={() => {
            setIsOpen(!isOpen);
            setGetRoute(item?.ancetre);
            setChemin(item?.ancetre);
          }}
          onClickImageInput={() => {
            setChemin(item?.ancetre);
            setStoreId(item?.parent);
          }}
          //. ---------------------------------------
          //. for edit input text in image component
          //. ---------------------------------------
          onChangeImageInput={(e: ChangeEvent<HTMLInputElement>) => {
            handleImageChange(e);
          }}
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
          handleImageChange(e);
          setIsOpen(!isOpen);
        }}
        onClose={() => {
          setIsOpen(false);
          setGetRoute(null);
        }}
        setUploadId={setUploadId}
        mediaId={mediaId}
        setMediaId={setMediaId}
        chemin_url={chemin}
        setGetImage={setGetImage}
      />
    </form>
  ) : (
    <div className="loader">
      <CircularProgress />
    </div>
  );
}
