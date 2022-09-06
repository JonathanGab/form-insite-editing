/// <reference types="react" />
export interface IForm {
    parsedData: [];
    tabInput: object;
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
}
