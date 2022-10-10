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
      props.open,
      props.id,
      props.setDataBeforeIterate,
      props.wordpress_module_url_back
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
      ...props.formValues,
      featured_media: props.mediaId,
    });
  };

  useEffect(() => {
    uploadImageWordPress(
      props.uploadId,
      props.setMediaId,
      props.setFormValues,
      props.formValues,
      props.mediaId
    );
  }, [props.uploadId, props.mediaId]);

  const handleInputChagne = (e: ChangeEvent<HTMLInputElement>, item: any) => {
    props.setFormValues({
      ...props.formValues,
      [item.ancetre]:
        item?.ancetre === props.custom_fields
          ? { ...props.formValues[item.ancetre], [item?.key]: e.target.value }
          : e.target.value,
      status: props.draft,
    });
  };
  return props.emptyArray ? (
    <div className="form-container">
      {props.lang} HI
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
              itemGrandParent={item?.grandParent}
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
    </div>
  ) : (
    <div>Loading...</div>
  );
};
