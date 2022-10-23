DIXEA-ReactJS-INSITE-EDITING

1. Install NPM packages with npm
   `sh npm install <name-of-package> `

OR
with YARN
`sh yarn add <name-of-package> `

Drawer props :

| props             | accept        |
| ----------------- | ------------- |
| open              | boolean       |
| formOne           | JSX element   |
| formTwo           | JSX element   |
| closeModalOnClick | function      |
| ---- Css -----    | ------------- |
| width             | string        |
| background        | string        |
| column            | boolean       |
| paperColor        | string        |

props for button :

| props            | accept   |
| ---------------- | -------- |
| color            | string   |
| position         | string   |
| top (optional)   | string   |
| right (optional) | string   |
| onClick          | function |

Drupal Form take many props :

| props                    |               accept               |
| ------------------------ | :--------------------------------: |
| emptyArray               |                 []                 |
| editFormValues           |                 {}                 |
| setEditFormValues        |      setState object function      |
| langague                 |               string               |
| onPatchData              |              function              |
| dataBeforeIterateFunc    |                 []                 |
| formId                   |               string               |
| dataAfterIterateFunc     |                 []                 |
| seDataAfterIterateFunc   |      setState array function       |
| openForm                 |              boolean               |
| setDataBeforeIterateFunc |      setState array function       |
| dragAndDropUploadId      |                 {}                 |
| setDragAndDropUploadId   |      setState object function      |
| mediaId                  |          string or number          |
| setMediaId               | setState string or number function |
| onClickIsPreview         |              function              |
| drupal_boolean_input     |              string[]              |
| drupal_string_input      |              string[]              |
| drupal_number_input      |              string[]              |
| drupal_image_field       |              string[]              |
| drupal_module_media_url  |               string               |
| drupal_module_api_url    |               string               |
| setEditFormMediaId       |      setState object function      |
