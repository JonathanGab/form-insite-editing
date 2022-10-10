import { iterate } from './iterate';

export const displayData = (
  varState: [],
  id: string,
  varData: [],
  setData: React.Dispatch<React.SetStateAction<any[]>>
): void => {
  if (varState !== null && varState !== undefined && id !== null) {
    iterate(varState, '', 'racine', 'gp', varData, setData);
  } else if (id === null) {
    setData([]);
  }
};
