import axios from 'axios';

export const fetchData = (
  open: boolean,
  id: string | null,
  setDrawerData: (data: []) => void,
  url: string
): void => {
  if (open === false && id === null) {
    setDrawerData([]);
  } else {
    axios
      .get(url)
      .then((response) => setDrawerData(response.data))
      .catch((err) => console.log(err));
  }
};
