var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const iterate = (varJson, varParent, varAncetre, varGrandParent, responseArray, setResponseArray) => __awaiter(void 0, void 0, void 0, function* () {
    for (let varKey in varJson) {
        let iterateObj = {
            ancetre: varAncetre,
            grandParent: varGrandParent,
            parent: null,
            key: null,
            content: null,
        };
        // tant que la clé est un objet, on continue la boucle
        if (typeof varJson[varKey] === 'object' && varJson[varKey] !== null) {
            let varAncetreNew = varAncetre;
            let varGrandParentNew = varGrandParent;
            if (varAncetre === 'racine') {
                varAncetreNew = varKey;
                varGrandParentNew = varKey;
            }
            else {
                varGrandParent = varKey;
            }
            iterate(varJson[varKey], varKey, varAncetreNew, varGrandParentNew, responseArray, setResponseArray);
        }
        else if (
        // si la clé est un string/number/boolean, on l'ajoute à la réponse
        typeof varJson[varKey] === 'string' ||
            typeof varJson[varKey] === 'number' ||
            typeof varJson[varKey] === 'boolean') {
            // create object with type
            iterateObj.ancetre = varAncetre;
            iterateObj.grandParent = varGrandParent;
            iterateObj.parent = varParent;
            iterateObj.key = varKey;
            iterateObj.content = varJson[varKey];
            // on remplit le tableau response avec les données
        }
        if (iterateObj.parent !== null ||
            iterateObj.key !== null ||
            iterateObj.content !== null) {
            if (responseArray.length === 0) {
                // si response est vide, on le remplit
                setResponseArray((prevState) => [...prevState, iterateObj]);
            }
            else {
                // si response n'est pas vide, on le vide et on le remplit
                setResponseArray([]);
                setTimeout(() => {
                    setResponseArray((prevState) => [...prevState, iterateObj]);
                }, 500);
            }
        }
    }
});
