import { jsonParser } from './jsonParser';
import { jsonParserDrupal } from './jsonParserDrupal';

export const displayData = (
  varState: [],
  id: string,
  varData: [],
  setData: React.Dispatch<React.SetStateAction<any[]>>
): void => {
  if (varState !== null && varState !== undefined && id !== null) {
    jsonParser(varState, '', 'racine', 'gp', varData, setData);
  } else if (id === null) {
    setData([]);
  }
};

export const DisplayDrupalData = (
  varState: [],
  id: string,
  varData: [],
  setData: React.Dispatch<React.SetStateAction<any[]>>
): void => {
  if (varState !== null && varState !== undefined && id !== null) {
    jsonParserDrupal(varState, '', 'racine', 'gp', varData, setData);
  } else if (id === null) {
    setData([]);
  }
};
