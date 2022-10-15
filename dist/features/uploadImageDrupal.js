export const uploadImageDrupal = (chemin_url, uploadId, setMediaId, setFormMediaValues, mediaId) => {
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
