export const changeIndex = (arr: []): [] => {
  const sortArray = arr.sort((a: { ancetre: string }, b: { ancetre: string }) =>
    a.ancetre > b.ancetre ? 1 : b.ancetre > a.ancetre ? -1 : 0
  );
  return sortArray;
};
