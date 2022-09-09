import React, { Dispatch, SetStateAction, FormEvent } from 'react';
export interface PropsDrupalForm {
  // tableau vide qui va contenir les données du formulaire
  emptyArray: [];
  // objet qui va contenir les données du formulaire modifié
  inputDataObject: object | any;
  // fonction qui va modifier l'objet tabInput
  setInputDataObject: React.Dispatch<React.SetStateAction<object>>;
  // fonction qui va envoyer les données du formulaire
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  // langue du formulaire
  lang: string;
  //? props for displayData()
  // tableau vide qui va accueillir les données du formulaire non filter
  dataBeforeIterate: [];
  // id du formulaire
  id: string;
  // tableau vide qui va accueillir les données du formulaire filter
  dataAfterIterate: [];
  // fonction qui va modifier le tableau varData
  seDataAfterIterate: React.Dispatch<React.SetStateAction<any[]>>;
  //? props for fetchData()
  // booléen qui va permettre de savoir si le formulaire est ouvert ou non
  open: boolean;
  // fonction qui va modifier le tableau drawerData
  setDataBeforeIterate: React.Dispatch<React.SetStateAction<any[]>>;
  // url de l'api
  url: string;
  //. props for wordpress module
  drupal_module_filter: string[];
  draft: string;
}
