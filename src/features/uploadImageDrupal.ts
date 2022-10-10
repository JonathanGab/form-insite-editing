export const uploadImageDrupal = (
  uploadId: object | any,
  setMediaId: React.Dispatch<React.SetStateAction<string | number>>,
  setFormMediaValues: React.Dispatch<React.SetStateAction<object>>,
  mediaId: number | string
): void => {
  if (uploadId) {
    setMediaId(uploadId.id);
    setFormMediaValues({
      field_image: {
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
