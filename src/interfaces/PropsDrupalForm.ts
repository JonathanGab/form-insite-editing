import React, { Dispatch, SetStateAction, FormEvent } from 'react';
export interface PropsDrupalForm {
  // tableau vide qui va contenir les données du formulaire
  emptyArray: [];
  // objet qui va contenir les données du formulaire modifié
  editFormValues: object | any;
  // fonction qui va modifier l'objet tabInput
  setEditFormValues: React.Dispatch<React.SetStateAction<object | string>>;
  // fonction qui va envoyer les données du formulaire
  onPatchData: (e: FormEvent<HTMLFormElement>) => void;
  //! props for displayData()
  // tableau qui a accueilli les données du formulaire filter avant d'être modifié
  dataBeforeIterateFunc: [];
  // id du formulaire
  formId: string;
  // tableau vide qui va accueillir les données du formulaire filter
  dataAfterIterateFunc: [];
  // fonction qui va modifier le tableau varData
  seDataAfterIterateFunc: Dispatch<SetStateAction<any[]>>;
  //! props for fetchData()
  // booléen qui va permettre de savoir si le formulaire est ouvert ou non
  openForm: boolean;
  // fonction qui va modifier le tableau drawerData
  setDataBeforeIterateFunc: Dispatch<SetStateAction<any[]>>;
  //! props for uploadImage()
  // id du media à uploader en Drag and Drop
  dragAndDropUploadId: object | any;
  // fonction qui va modifier l'id du media à uploader en Drag and Drop
  setDragAndDropUploadId: Dispatch<SetStateAction<object | any>>;
  // id du media sur lequel on a cliqué
  mediaId: number | string;
  // fonction qui modifie l'id du media sur lequel on a cliqué
  setMediaId: Dispatch<SetStateAction<string | number>>;
  //! props for drupal module
  drupal_module_filter: string[];
  drupal_module_url_back: string;
  draft: string;
  //! props for previews
  onClickIsPreview: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  //! generic input filter
  drupal_boolean_input: string[];
  drupal_string_input: string[];
  drupal_number_input: string[];
  drupal_image_field: string[];
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
}
