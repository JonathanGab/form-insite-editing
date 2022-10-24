import axios from 'axios';

export const fetchData = async (
  open: boolean,
  id: string | null,
  setDrawerData: (data: []) => void,
  url: string
): Promise<void> => {
  // si le drawer et fermé et que l'id est null on vide le tablea drawerData
  if (open === false && id === null) {
    setDrawerData([]);
  } else {
    try {
      // sinon on fait une requete et on rempli le tableau drawerData
      const res = await axios.get(url);
      setDrawerData(res.data);
    } catch (err) {
      // en cas d'erreur on vide le tableau drawerData
      setDrawerData([]);
    }
  }
};
