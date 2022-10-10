export const uploadImageWordPress = (
  uploadId: object | any,
  setMediaId: React.Dispatch<React.SetStateAction<string | number>>,
  setFormMediaValues: React.Dispatch<React.SetStateAction<object>>,
  tabInput: object,
  mediaId: number | string
): void => {
  if (uploadId) {
    setMediaId(uploadId.id);
    setFormMediaValues({ ...tabInput, featured_media: mediaId });
  }
  return;
};
