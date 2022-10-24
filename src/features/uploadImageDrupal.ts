export const uploadImageDrupal = (
  chemin_url: string,
  uploadId: object | any,
  setMediaId: React.Dispatch<React.SetStateAction<string | number>>,
  setEditFormMedia: React.Dispatch<React.SetStateAction<object>>,
  mediaId: number | string
): void => {
  if (uploadId) {
    setMediaId(uploadId.id);
    setEditFormMedia({
      [chemin_url]: {
        data: {
          type: 'file--file',
          id: mediaId,
          meta: {
            alt: '',
            title: '',
          },
        },
      },
    });
  }
  return;
};
