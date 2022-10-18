import axios from 'axios';

export const fetchData = async (
  open: boolean,
  id: string | null,
  setDrawerData: (data: []) => void,
  url: string
): Promise<void> => {
  if (open === false && id === null) {
    setDrawerData([]);
  } else {
    try {
      const res = await axios.get(url);
      setDrawerData(res.data);
    } catch (err) {
      setDrawerData([]);
    }
  }
};
