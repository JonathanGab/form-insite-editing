import { iterate } from './iterate';
export const displayData = (varState, id, varData, setData) => {
    if (varState !== null && varState !== undefined && id !== null) {
        iterate(varState, '', 'racine', 'gp', varData, setData);
    }
    else if (id === null) {
        setData([]);
    }
};
