import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
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

export function DrupalForm(props: PropsDrupalForm): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [getRoute, setGetRoute] = useState<null | string>(null);
  const [storeId, setStoreId] = useState('');
  const [getImage, setGetImage] = useState<object>({});
  const [storageArray, setStorageArray] = useState([]);
  //? --------------------------------------------------------------------------------
  //? ---------------------------------- USE EFFECT ----------------------------------
  //? --------------------------------------------------------------------------------
  useEffect(() => {
    fetchData(
      props.openForm,
      props.formId,
      props.setDataBeforeIterateFunc,
      props.drupal_module_url_back
    );
  }, [props.openForm, props.formId, props.navigation]);

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
      props.chemin_url,
      props.dragAndDropUploadId,
      props.setMediaId,
      props.setEditFormMedia,
      props.mediaId
    );
  }, [props.dragAndDropUploadId, props.mediaId]);

  useEffect(() => {
    if (getImage !== null && getImage !== undefined) {
      updateArrayImage(getRoute as string, getImage);
    }
  }, [getImage]);

  //? --------------------------------------------------------------------------------
  //? ------------------------------ EDIT DATA FOR TEXT ------------------------------
  //? --------------------------------------------------------------------------------

  const handleInputsChange = (e: ChangeEvent<HTMLInputElement>, item: any) => {
    props.setEditFormValues(
      item?.parent === 'attributes'
        ? {
            ...props.editFormValues,
            ...props.editFormValues[item?.ancetre],
            [item?.key]: e.target.value,
          }
        : {
            ...props.editFormValues,
            ...props.editFormValues[item?.ancetre],
            [item?.parent]: e.target.value,
          }
    );
  };

  //? --------------------------------------------------------------------------------
  //? ------------------------------- CHANGE DATA FOR IMAGE --------------------------
  //? --------------------------------------------------------------------------------

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.setEditFormMedia({
      ...props.editFormMedia,
      [props.chemin]: {
        data: {
          type: 'file--file',
          id: props.mediaId || storeId,
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

  console.log(isOpen);

  return props.emptyArray ? (
    <form onSubmit={props.onPatchData} className="form-cms">
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
            props.setChemin(item?.ancetre);
          }}
          onClickImageInput={() => {
            props.setChemin(item?.ancetre);
            setStoreId(item?.parent);
          }}
          //. for edit input text in image component
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
          setIsOpen(!isOpen);
          handleImageChange(e);
        }}
        setUploadId={props.setDragAndDropUploadId}
        mediaId={props.mediaId}
        setMediaId={props.setMediaId}
        altText={props.alt}
        setAltText={props.setAlt}
        chemin_url={props.chemin_url}
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
