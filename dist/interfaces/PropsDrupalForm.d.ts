import React from 'react';
export interface PropsDrupalForm {
    emptyArray: [];
    inputDataObject: object | any;
    setInputDataObject: React.Dispatch<React.SetStateAction<object>>;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    lang: string;
    dataBeforeIterate: [];
    id: string;
    dataAfterIterate: [];
    seDataAfterIterate: React.Dispatch<React.SetStateAction<any[]>>;
    open: boolean;
    setDataBeforeIterate: React.Dispatch<React.SetStateAction<any[]>>;
    url: string;
    drupal_module_filter: string[];
    draft: string;
}
