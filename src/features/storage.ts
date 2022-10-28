import React from 'react';

export const storeData = (data: object) => {
  try {
    const jsonValue = JSON.stringify(data);
    sessionStorage.setItem('user', jsonValue);
  } catch (e) {
    console.error(e);
  }
};

export const getDataFromLocalStorage = (
  setArray: React.Dispatch<React.SetStateAction<[]>>
) => {
  try {
    const getJsonValue = sessionStorage.getItem('user');
    return getJsonValue != null ? setArray(JSON.parse(getJsonValue)) : null;
  } catch (e) {
    console.error(e);
  }
};
