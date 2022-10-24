var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
export const fetchData = (open, id, setDrawerData, url) => __awaiter(void 0, void 0, void 0, function* () {
    // si le drawer et fermé et que l'id est null on vide le tablea drawerData
    if (open === false && id === null) {
        setDrawerData([]);
    }
    else {
        try {
            // sinon on fait une requete et on rempli le tableau drawerData
            const res = yield axios.get(url);
            setDrawerData(res.data);
        }
        catch (err) {
            // en cas d'erreur on vide le tableau drawerData
            setDrawerData([]);
        }
    }
});
