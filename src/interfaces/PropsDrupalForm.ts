import React, { Dispatch, SetStateAction, FormEvent } from 'react';
export interface PropsDrupalForm {
  // tableau vide qui va contenir les données du formulaire
  emptyArray: [];
  // objet qui va contenir les données du formulaire modifié
  formValues: object | any;
  // fonction qui va modifier l'objet tabInput
  setFormValues: React.Dispatch<React.SetStateAction<object | string>>;
  // fonction qui va envoyer les données du formulaire
  onPatchData: (e: FormEvent<HTMLFormElement>) => void;
  //! langue du formulaire
  lang: string;
  //! props for displayData()
  // tableau qui a accueilli les données du formulaire filter avant d'être modifié
  dataBeforeIterate: [];
  // id du formulaire
  id: string;
  // tableau vide qui va accueillir les données du formulaire filter
  dataAfterIterate: [];
  // fonction qui va modifier le tableau varData
  seDataAfterIterate: Dispatch<SetStateAction<any[]>>;
  //! props for fetchData()
  // booléen qui va permettre de savoir si le formulaire est ouvert ou non
  open: boolean;
  // fonction qui va modifier le tableau drawerData
  setDataBeforeIterate: Dispatch<SetStateAction<any[]>>;
  //! props for uploadImage()
  // id du media à uploader en Drag and Drop
  uploadId: object | any;
  // fonction qui va modifier l'id du media à uploader en Drag and Drop
  setUploadId: Dispatch<SetStateAction<object | any>>;
  // id du media sur lequel on a cliqué
  mediaId: number | string;
  // fonction qui modifie l'id du media sur lequel on a cliqué
  setMediaId: Dispatch<SetStateAction<string | number>>;
  //! props for drupal module
  drupal_module_filter: string[];
  drupal_module_url_back: string;
  draft: string;
  //! props for previews
  onClickPreview: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  //! generic input filter
  drupal_boolean_input: string[];
  drupal_string_input: string[];
  drupal_number_input: string[];
  drupal_image_input: string[];
}
