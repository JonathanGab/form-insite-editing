import React, { Dispatch, SetStateAction, FormEvent } from 'react';
export interface PropsDrupalForm {
    emptyArray: [];
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
    editFormMedia: object | any;
    setEditFormMedia: Dispatch<React.SetStateAction<{}>>;
    chemin: string;
    setChemin: Dispatch<React.SetStateAction<string>>;
    media_url: string;
    api_url: string;
    setAlt: Dispatch<React.SetStateAction<string>>;
    setTitle: Dispatch<React.SetStateAction<string>>;
    title: string;
    alt: string;
    chemin_url: string;
    image_array: [];
    navigation: string;
    drupal_base_url: string;
    user: string;
    user_mdp: string;
}
