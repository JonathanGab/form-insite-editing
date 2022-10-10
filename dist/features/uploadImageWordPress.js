export const uploadImageWordPress = (uploadId, setMediaId, setFormMediaValues, tabInput, mediaId) => {
    if (uploadId) {
        setMediaId(uploadId.id);
        setFormMediaValues(Object.assign(Object.assign({}, tabInput), { featured_media: mediaId }));
    }
    return;
};
