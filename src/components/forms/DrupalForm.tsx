import React, { useState, useEffect, ChangeEvent } from 'react';
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
import { changeIndex } from '../../features/changeIndex';

export function DrupalForm(props: PropsDrupalForm): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchData(
      props.openForm,
      props.formId,
      props.setDataBeforeIterateFunc,
      props.drupal_module_url_back
    );
  }, [props.openForm]);

  useEffect(() => {
    DisplayDrupalData(
      props.dataBeforeIterateFunc,
      props.formId,
      props.dataAfterIterateFunc,
      props.seDataAfterIterateFunc
    );
  }, [props.dataBeforeIterateFunc]);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    props.setEditFormMedia({
      [props.chemin]: {
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
    uploadImageDrupal(
      props.chemin_url,
      props.dragAndDropUploadId,
      props.setMediaId,
      props.setEditFormMedia,
      props.mediaId
    );
  }, [props.dragAndDropUploadId, props.mediaId]);

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

  return props.emptyArray ? (
    <form onSubmit={props.onPatchData} className="form-cms">
      {changeIndex(props.emptyArray)
        ?.filter(
          (element: IMap) =>
            props.drupal_module_filter.includes(element?.ancetre) &&
            props.drupal_module_filter.includes(element?.key)
        )
        ?.map((item: IMap, index: number) => (
          <GenericInputDrupal
            key={index}
            type={item?.content}
            itemAncetre={item?.ancetre}
            itemParent={item?.parent}
            itemKey={item?.key}
            //. values of inputs
            inputLabel={item?.key}
            defaultValue={removeHtmlTags(item?.content)}
            value={item?.content}
            src={`http://localhost${item?.content}`}
            //. style of inputs
            rows={
              typeof item?.content === 'string' && item?.content.length > 35
                ? 5
                : 1
            }
            label={item?.key}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputsChange(e, item)
            }
            //. for filter inside genericInputDrupal
            drupal_boolean_input={props.drupal_boolean_input}
            drupal_string_input={props.drupal_string_input}
            drupal_number_input={props.drupal_number_input}
            drupal_image_field={props.drupal_image_field}
            updateImageOnClick={() => {
              setIsOpen(!isOpen);
              props.setChemin(item?.ancetre);
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
        onClick={handleOpen}
        setUploadId={props.setDragAndDropUploadId}
        mediaId={props.mediaId}
        setMediaId={props.setMediaId}
        title={props.title}
        setTitle={props.setTitle}
        altText={props.alt}
        setAltText={props.setAlt}
        chemin_url={props.chemin_url}
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
