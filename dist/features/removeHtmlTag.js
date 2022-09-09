export const removeHtmlTags = (str) => {
    var _a;
    return (_a = `${str}`) === null || _a === void 0 ? void 0 : _a.replace(/<[^>]*>?/gm, '');
};
