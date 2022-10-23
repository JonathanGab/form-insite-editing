type Image = {
  image_url: string;
  field_name: string;
  image_id: string | null;
  title: string;
  alt: string;
};

type ImageIncluded = {
  id: null | string;
  image_url: null | string;
  isImage: boolean;
};

let varImage = <Image>{};
let varImageIncluded = <ImageIncluded>{};
let includedArray: string[] = [];

// pour recupérer le nom de la relation
const splitChemin = (relation: string) => {
  let splitrelation = relation.split('>');
  return splitrelation[2];
};

export const jsonParserDrupal = (
  // Donnée provenant du json
  // Data from json
  varDataJson: [],
  // nom par default de l'ancetre
  // default name of the ancestor
  varAncetre: string,
  // nom par défaut du parent
  // default name of the parent
  varParent: string,
  // nom par défaut de l'enfant
  // default name of the child
  varChemin: string,
  // tableau pour stocker les données
  // array to store data
  responseArray: any[],
  // fonction pour editer les données
  // function to edit data
  setResponseArray: React.Dispatch<React.SetStateAction<any[]>>,
  // tableau pour stocker les images
  varRelationshipsImageArray: string[]
) => {
  for (let varKey in varDataJson) {
    let iterateObj = {
      ancetre: varAncetre,
      chemin: varChemin,
      parent: null as string | null,
      key: null as string | null,
      content: null as any,
    };
    // si la clé est un objet, on relance la fonction
    // if the key is an object, iterate again
    if (
      typeof varDataJson[varKey] === 'object' &&
      varDataJson[varKey] !== null
    ) {
      let varAncetreNew = varAncetre;
      let varCheminNew = varChemin;
      if (varAncetre === 'racine') {
        varAncetreNew = varKey;
        varCheminNew = varKey;
      } else {
        varCheminNew = `${varChemin}>${varKey}`;
      }
      jsonParserDrupal(
        varDataJson[varKey],
        varAncetreNew,
        varKey,
        varCheminNew,
        responseArray,
        setResponseArray,
        varRelationshipsImageArray
      );
    } else if (
      // si la clé est un string/number/boolean, on l'ajoute à la réponse
      // if the key is a string/number/boolean, we add it to the response
      typeof varDataJson[varKey] === 'string' ||
      typeof varDataJson[varKey] === 'number' ||
      typeof varDataJson[varKey] === 'boolean'
    ) {
      // on assigne les valeurs au propriétés de l'objet iterateObj
      // we assign the values to the properties of the iterateObj object
      iterateObj.ancetre = varAncetre;
      iterateObj.chemin = varChemin;
      iterateObj.parent = varParent;
      iterateObj.key = varKey;
      iterateObj.content = varDataJson[varKey];
    }
    if (
      iterateObj.ancetre === 'data' &&
      iterateObj.chemin.includes('data>relationships>field') &&
      iterateObj.content === 'file--file'
    ) {
      //. -------------------------------------------------------------------------------------------------------------------------
      varImage.field_name = splitChemin(iterateObj.chemin);
    } else if (
      iterateObj.ancetre === 'data' &&
      //! ATTENTION le nom du champs système d'une image dans drupal doit commencer par field
      //! CAUTION the name of the system field of an image in drupal must begin with field
      iterateObj.chemin.includes('data>relationships>field') &&
      iterateObj.key === 'id'
    ) {
      varImage.image_id = iterateObj.content;
    } else if (iterateObj.key === 'alt') {
      varImage.alt = iterateObj.content;
    } else if (iterateObj.key === 'title' && iterateObj.parent === 'meta') {
      varImage.title = iterateObj.content;
      varRelationshipsImageArray.push({ ...varImage } as any);
    } else if (
      iterateObj.ancetre === 'included' &&
      iterateObj.parent === 'uri' &&
      iterateObj.key === 'url'
    ) {
      varImageIncluded.image_url = iterateObj.content;
    } else if (
      iterateObj.ancetre === 'included' &&
      iterateObj.key === 'id' &&
      iterateObj.parent !== 'data'
    ) {
      varImageIncluded.id = iterateObj.content;
    } else if (
      iterateObj.key === 'filemime' &&
      iterateObj.content.includes('image/')
    ) {
      varImageIncluded.isImage = true;
      includedArray.push({ ...(varImageIncluded as any) });
    }
    // On remplit l'object avec les champs non null
    // We fill the object with non null fields
    if (
      iterateObj.parent !== null ||
      iterateObj.key !== null ||
      iterateObj.content !== null
    ) {
      if (responseArray.length === 0) {
        // si response est vide, on le remplit
        setResponseArray((prevState) => [...prevState, iterateObj]);
      } else {
        // si response n'est pas vide, on le vide et on le remplit
        setResponseArray([]);
        setTimeout(() => {
          setResponseArray((prevState) => [...prevState, iterateObj]);
        }, 500);
      }
    }
    //. -------------------------------------------------------- END OF LOOP  -------------------------------------------------------
  }
  // Ajoute l'image au tableau de relation
  // Add image url to relationships array
  varRelationshipsImageArray.forEach((relation: any): void => {
    includedArray.forEach((include: any): void => {
      if (relation.image_id === include.id) {
        relation.image_url = include.image_url;
        relation.isImage = include.isImage;
      }
    });
  });

  // ajoute le tableau de relation au tableau de réponse
  // add relationship array to at the end of response array
  setResponseArray((prevState) => [
    ...prevState,
    // si l'element est déjà présent on le l'ajoute pas
    // if the element is already present, we don't add it
    ...varRelationshipsImageArray
      .filter(
        (item: any) =>
          !prevState.some((prevItem) => prevItem.ancetre === item.field_name)
      )
      // on créer l'object avec le même format
      // create new object with same structure
      .map((element: any) => {
        return {
          ancetre: element.field_name,
          chemin: element.field_name,
          parent: element.image_id,
          isImage: element.isImage,
          key: 'id',
          alt: element.alt,
          title: element.title,
          content: element.image_url,
        };
      }),
  ]);
};
