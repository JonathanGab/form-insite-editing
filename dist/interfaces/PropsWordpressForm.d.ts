/// <reference types="react" />
export interface PropsWordpressForm {
    parsedData: [];
    tabInput: object | any;
    setTabInput: React.Dispatch<React.SetStateAction<object>>;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    lang: string;
    varState: [];
    id: string;
    varData: [];
    setData: React.Dispatch<React.SetStateAction<any[]>>;
    open: boolean;
    setDrawerData: React.Dispatch<React.SetStateAction<any[]>>;
    url: string;
    wordpress_module_filter: string[];
    custom_fields: string;
    draft: string;
}