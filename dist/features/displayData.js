import { jsonParser } from './jsonParser';
import { jsonParserDrupal } from './jsonParserDrupal';
export const displayData = (varStateJson, varId, varDataArray, setDataArray) => {
    if (varStateJson !== null && varStateJson !== undefined && varId !== null) {
        jsonParser(varStateJson, 'racine', '', 'gp', varDataArray, setDataArray);
    }
    else if (varId === null) {
        setDataArray([]);
    }
};
export const DisplayDrupalData = (varStateJson, varId, varDataArray, setDataArray, varImageArray) => {
    // si l'id n'est pas null on vide d'abord le tableau dataArray pour eviter les doublons
    // et on rempli le tableau avec les données filtrées de la fonction jsonParserDrupal
    if (varId !== null) {
        setDataArray([]);
        varImageArray = [];
        jsonParserDrupal(varStateJson, 'racine', '', 'gp', varDataArray, setDataArray, varImageArray);
    }
    else {
        // sinon les tableaux sont vides
        setDataArray([]);
        varImageArray = [];
    }
};
