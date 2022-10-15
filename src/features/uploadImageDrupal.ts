export const uploadImageDrupal = (
  chemin_url: string,
  uploadId: object | any,
  setMediaId: React.Dispatch<React.SetStateAction<string | number>>,
  setFormMediaValues: React.Dispatch<React.SetStateAction<object>>,
  mediaId: number | string
): void => {
  if (uploadId) {
    setMediaId(uploadId.id);
    setFormMediaValues({
      [chemin_url]: {
        data: {
          type: 'file--file',
          id: mediaId,
          meta: {
            alt: 'test',
            title: 'test',
          },
        },
      },
    });
  }
  return;
};
