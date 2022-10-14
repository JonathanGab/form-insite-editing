import React, { Dispatch, SetStateAction, FormEvent } from 'react';
export interface PropsWordpressForm {
  // tableau vide qui va contenir les données du formulaire
  emptyArray: [];
  // objet qui va contenir les données du formulaire modifié
  editFormValues: object | any;
  // fonction qui va modifier l'objet tabInput
  setEditFormValues: Dispatch<SetStateAction<object | string>>;
  // fonction qui va envoyer les données du formulaire
  onPatchData: (e: FormEvent<HTMLFormElement>) => void;
  //! langue du formulaire
  langague: string;
  //! props for displayData()
  // tableau qui a accueilli les données du formulaire filter avant d'être modifié
  dataBeforeIterateFunc: [];
  // id du formulaire
  formId: string;
  // tableau qui a accueilli les données du formulaire filter après itération
  dataAfterIterateFunc: [];
  // fonction qui modifie le tableau dataAfterIterate
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
  //! props for wordpress module
  wordpress_module_filter: string[];
  wordpress_module_url_back: string;
  custom_fields: string;
  draft: string;
  //! props for previews
  onClickIsPreview: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}
