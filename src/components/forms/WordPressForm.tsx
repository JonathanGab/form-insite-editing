import React, { useState, useEffect, ChangeEvent } from 'react';
import { PropsWordpressForm } from '../../interfaces/PropsWordpressForm';
import { IMap } from '../../interfaces/IMap';
import { displayData } from '../../features/displayData';
import { fetchData } from '../../features/fetchData';
import { removeHtmlTags } from '../../features/removeHtmlTag';
import Modal from '../modal/Modal';
import './Form.css';
import { uploadImageWordPress } from '../../features/uploadImageWordPress';
import GenericInputWordPress from '../inputs/generic/GenericInputWordPress';
import { PropsDrupalForm } from '../../interfaces/PropsDrupalForm';

export const WordPressForm = (props: PropsWordpressForm): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchData(
      props.openForm,
      props.formId,
      props.seDataAfterIterateFunc,
      props.wordpress_module_url_back
    );
  }, [props.openForm]);

  useEffect(() => {
    displayData(
      props.dataBeforeIterateFunc,
      props.formId,
      props.dataAfterIterateFunc,
      props.seDataAfterIterateFunc
    );
  }, [props.dataBeforeIterateFunc]);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    props.setEditFormValues({
      ...props.editFormValues,
      featured_media: props.mediaId,
    });
  };

  useEffect(() => {
    uploadImageWordPress(
      props.dragAndDropUploadId,
      props.setMediaId,
      props.setEditFormValues,
      props.editFormValues,
      props.mediaId
    );
  }, [props.dragAndDropUploadId, props.mediaId]);

  const handleInputChagne = (e: ChangeEvent<HTMLInputElement>, item: any) => {
    props.setEditFormValues({
      ...props.editFormValues,
      [item.ancetre]:
        item?.ancetre === props.custom_fields
          ? {
              ...props.editFormValues[item.ancetre],
              [item?.key]: e.target.value,
            }
          : e.target.value,
      status: props.draft,
    });
  };
  return props.emptyArray ? (
    <div className="form-container">
      {props.langague} HI
      <form onSubmit={props.onPatchData} className="form">
        {props.emptyArray
          ?.filter(
            (element: IMap) =>
              props.wordpress_module_filter.includes(element?.ancetre) &&
              props.wordpress_module_filter.includes(element?.key)
          )
          ?.map((item: IMap, index: number) => (
            <GenericInputWordPress
              key={index}
              type={item?.content}
              itemAncetre={item?.ancetre}
              itemParent={item?.parent}
              itemKey={item?.key}
              rows={
                typeof item?.content === 'string' && item?.content.length > 35
                  ? 5
                  : 1
              }
              defaultValue={removeHtmlTags(item?.content)}
              src={item?.content}
              label={item.key === 'rendered' ? item?.ancetre : item?.key}
              name={item?.ancetre}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleInputChagne(e, item);
              }}
            />
          ))}
        <div className="upload-media">
          <button className="button-media" type="button" onClick={handleOpen}>
            upload media
          </button>
        </div>
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
        <Modal
          open={isOpen}
          onClick={handleOpen}
          uploadId={props.dragAndDropUploadId}
          setUploadId={props.setDragAndDropUploadId}
          mediaId={props.mediaId}
          setMediaId={props.setMediaId}
        />
      </form>
    </div>
  ) : (
    <div>Loading...</div>
  );
};
