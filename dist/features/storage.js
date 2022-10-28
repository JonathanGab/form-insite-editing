export const storeData = (data) => {
    try {
        const jsonValue = JSON.stringify(data);
        sessionStorage.setItem('user', jsonValue);
    }
    catch (e) {
        console.error(e);
    }
};
export const getDataFromLocalStorage = (setArray) => {
    try {
        const getJsonValue = sessionStorage.getItem('user');
        return getJsonValue != null ? setArray(JSON.parse(getJsonValue)) : null;
    }
    catch (e) {
        console.error(e);
    }
};
