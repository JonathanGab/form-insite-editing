import { jsonParser } from './jsonParser';
import { jsonParserDrupal } from './jsonParserDrupal';

export const displayData = (
  varStateJson: [],
  varId: string,
  varDataArray: [],
  setDataArray: React.Dispatch<React.SetStateAction<any[]>>
): void => {
  if (varStateJson !== null && varStateJson !== undefined && varId !== null) {
    jsonParser(varStateJson, 'racine', '', 'gp', varDataArray, setDataArray);
  } else if (varId === null) {
    setDataArray([]);
  }
};

export const DisplayDrupalData = (
  varStateJson: [],
  varId: string,
  varDataArray: [],
  setDataArray: React.Dispatch<React.SetStateAction<any[]>>,
  varImageArray: []
): void => {
  if (varId !== null) {
    setDataArray([]);
    varImageArray = [];
    jsonParserDrupal(
      varStateJson,
      'racine',
      '',
      'gp',
      varDataArray,
      setDataArray,
      varImageArray
    );
  } else {
    setDataArray([]);
    varImageArray = [];
  }
};
