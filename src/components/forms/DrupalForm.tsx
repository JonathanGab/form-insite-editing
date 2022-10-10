import React, { useState, useEffect, ChangeEvent } from 'react';
import { PropsDrupalForm } from '../../interfaces/PropsDrupalForm';
import { IMap } from '../../interfaces/IMap';
import { displayData } from '../../features/displayData';
import { fetchData } from '../../features/fetchData';
import { removeHtmlTags } from '../../features/removeHtmlTag';
import { uploadImageDrupal } from '../../features/uploadImageDrupal';
import './Form.css';
import Modal from '../modal/Modal';
import GenericInput from '../inputs/generic/GenericInputWordPress';
import GenericInputDrupal from '../inputs/generic/GenericInputDrupal';
export function DrupalForm(props: PropsDrupalForm): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    fetchData(
      props.open,
      props.id,
      props.setDataBeforeIterate,
      props.drupal_module_url_back
    );
  }, [props.open]);

  useEffect(() => {
    displayData(
      props.dataBeforeIterate,
      props.id,
      props.dataAfterIterate,
      props.seDataAfterIterate
    );
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
    uploadImageDrupal(
      props.uploadId,
      props.setMediaId,
      props.setFormValues,
      props.mediaId
    );
  }, [props.uploadId, props.mediaId]);

  const handleInputsChange = (e: ChangeEvent<HTMLInputElement>, item: any) => {
    props.setFormValues(
      item?.parent === 'attributes'
        ? {
            ...props.formValues,
            ...props.formValues[item?.ancetre],
            [item?.key]: e.target.value,
          }
        : {
            ...props.formValues,
            ...props.formValues[item?.ancetre],
            [item?.parent]: e.target.value,
          }
    );
  };

  return props.emptyArray ? (
    <form onSubmit={props.onPatchData} className="form-cms">
      {props.emptyArray
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
            itemGrandParent={item?.grandParent}
            itemParent={item?.parent}
            itemKey={item?.key}
            rows={
              typeof item?.content === 'string' && item?.content.length > 35
                ? 5
                : 1
            }
            src={`http://localhost${item?.content}`}
            label={item?.key}
            defaultValue={removeHtmlTags(item?.content)}
            name={item?.ancetre}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputsChange(e, item)
            }
            value={item?.content}
            drupal_boolean_input={props.drupal_boolean_input}
            drupal_string_input={props.drupal_string_input}
            drupal_number_input={props.drupal_number_input}
            drupal_image_field={props.drupal_image_input}
          />
        ))}
      <div className="upload-media">
        <button className="button-media">upload media</button>
      </div>
      <div className="btn-container">
        <button
          className="btn-send"
          type="button"
          onClick={props.onClickPreview}
        >
          Preview
        </button>
        <button className="btn-send">send</button>
      </div>
      <Modal
        open={isOpen}
        onClick={handleOpen}
        uploadId={props.uploadId}
        setUploadId={props.setUploadId}
        mediaId={props.mediaId}
        setMediaId={props.setMediaId}
      />
    </form>
  ) : (
    <div>Loading...</div>
  );
}
