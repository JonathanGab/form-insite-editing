export const uploadImageWordPress = (
// id de l'upload
uploadId, 
// fonction pour mettre à jour le state mediaId
setMediaId, 
// fonction qui sert a mettre a jour le state de l'image
setFormMediaValues, tabInput, 
//
mediaId) => {
    if (uploadId) {
        // surcharger l'id de l'upload dans le state mediaId
        setMediaId(uploadId.id);
        setFormMediaValues(Object.assign(Object.assign({}, tabInput), { featured_media: mediaId }));
    }
    return;
};
