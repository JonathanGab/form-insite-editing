import React, { Dispatch, SetStateAction, FormEvent } from 'react';
export interface PropsWordpressForm {
    emptyArray: [];
    editFormValues: object | any;
    setEditFormValues: Dispatch<SetStateAction<object | string>>;
    onPatchData: (e: FormEvent<HTMLFormElement>) => void;
    langague: string;
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
    wordpress_module_filter: string[];
    wordpress_module_url_back: string;
    custom_fields: string;
    draft: string;
    onClickIsPreview: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
