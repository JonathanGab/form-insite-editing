export interface PropsWordpressForm {
  parsedData: [];
  tabInput: object | any;
  setTabInput: React.Dispatch<React.SetStateAction<object>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  lang: string;
  // props for displayData()
  varState: [];
  id: string;
  varData: [];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  // props for fetchData()
  open: boolean;
  setDrawerData: React.Dispatch<React.SetStateAction<any[]>>;
  url: string;
  // props for wordpress module
  wordpress_module_filter: string[];
  custom_fields: string;
  draft: string;
}
