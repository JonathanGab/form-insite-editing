import React, { Dispatch, SetStateAction, FormEvent } from 'react';
export interface PropsDrupalForm {
    emptyArray: [];
    formValues: object | any;
    setFormValues: React.Dispatch<React.SetStateAction<object | string>>;
    onPatchData: (e: FormEvent<HTMLFormElement>) => void;
    lang: string;
    dataBeforeIterate: [];
    id: string;
    dataAfterIterate: [];
    seDataAfterIterate: Dispatch<SetStateAction<any[]>>;
    open: boolean;
    setDataBeforeIterate: Dispatch<SetStateAction<any[]>>;
    uploadId: object | any;
    setUploadId: Dispatch<SetStateAction<object | any>>;
    mediaId: number | string;
    setMediaId: Dispatch<SetStateAction<string | number>>;
    drupal_module_filter: string[];
    drupal_module_url_back: string;
    draft: string;
    onClickPreview: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    drupal_boolean_input: string[];
    drupal_string_input: string[];
    drupal_number_input: string[];
    drupal_image_input: string[];
}
