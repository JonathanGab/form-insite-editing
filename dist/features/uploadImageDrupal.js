export const uploadImageDrupal = (uploadId, setMediaId, setFormMediaValues, mediaId) => {
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
