import React, { Dispatch, SetStateAction, FormEvent } from 'react';
export interface PropsDrupalForm {
    emptyArray: emptyArrayType[] | any;
    editFormValues: object | any;
    setEditFormValues: React.Dispatch<React.SetStateAction<object | string>>;
    onPatchData: (e: FormEvent<HTMLFormElement>) => void;
    dataBeforeIterateFunc: [];
    formId: string;
    dataAfterIterateFunc: [];
    seDataAfterIterateFunc: Dispatch<SetStateAction<any[]>>;
    openForm: boolean;
    setDataBeforeIterateFunc: Dispatch<SetStateAction<any[]>>;
    dragAndDropUploadId: object | any;
    setDragAndDropUploadId: Dispatch<SetStateAction<object | any>>;
    mediaId: number | string;
    setMediaId: Dispatch<SetStateAction<string | number>>;
    drupal_module_filter: string[];
    drupal_module_url_back: string;
    draft: string;
    onClickIsPreview: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    drupal_boolean_input: string[];
    drupal_string_input: string[];
    drupal_number_input: string[];
    drupal_module_media_url: string;
    drupal_module_api_url: string;
    media_url: string;
    api_url: string;
    chemin_url: string;
    image_array: [];
    navigation: string;
    drupal_base_url: string;
    previewMedia: previewMediaType[];
    setPreviewMedia: Dispatch<React.SetStateAction<previewMediaType[]>>;
}
declare type emptyArrayType = {
    ancetre: string;
    parent: string;
    key: string;
    content: string;
};
declare type previewMediaType = {
    chemin: string;
    id: string;
    url: string;
};
export {};
