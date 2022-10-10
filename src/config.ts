module.exports = {
  // FOR WORDPRESS CMS
  wordpress_module: {
    url_website_back: '',
    // draft or publish
    draft: '',
    url_token_module: '',
    filter: [],
    cms: '',
    // utilisez vous un module pour generer des customs fields ?
    // si oui precisez le nom du module ci dessous le nom utilisé dans l'api
    // nous recommandons l'utilisation du module Advanced Custom Fields (ACF)
    custom_fields: '',
  },
  // FOR DRUPAL CMS
  drupal_module: {
    // entrez l'ancetre et la key de votre objet
    // afin de pouvoir afficher les champs correspondants
    filter: [],
    // precisez le nom de votre cms
    cms: '',
    send_data: [],
  },
};
