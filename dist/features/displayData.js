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
    if (varId !== null) {
        setDataArray([]);
        varImageArray = [];
        jsonParserDrupal(varStateJson, 'racine', '', 'gp', varDataArray, setDataArray, varImageArray);
    }
    else {
        setDataArray([]);
        varImageArray = [];
    }
};
