export const uploadImageWordPress = (
  // id de l'upload
  uploadId: object | any,
  // fonction pour mettre à jour le state mediaId
  setMediaId: React.Dispatch<React.SetStateAction<string | number>>,
  // fonction qui sert a mettre a jour le state de l'image
  setFormMediaValues: React.Dispatch<React.SetStateAction<object>>,

  tabInput: object,
  //
  mediaId: number | string
): void => {
  if (uploadId) {
    // surcharger l'id de l'upload dans le state mediaId
    setMediaId(uploadId.id);

    setFormMediaValues({ ...tabInput, featured_media: mediaId });
  }
  return;
};
