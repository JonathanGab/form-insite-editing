import React, { Dispatch, SetStateAction, FormEvent } from 'react';
export interface PropsWordpressForm {
    emptyArray: [];
    formValues: object | any;
    setFormValues: Dispatch<SetStateAction<object | string>>;
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
    wordpress_module_filter: string[];
    wordpress_module_url_back: string;
    custom_fields: string;
    draft: string;
    onClickPreview: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
