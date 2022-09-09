import React, { useEffect } from 'react';
import TextInput from './TextInput';
import { displayData } from '../features/displayData';
import { fetchData } from '../features/fetchData';
import { removeHtmlTags } from '../features/removeHtmlTag';
export function DrupalForm(props) {
    var _a, _b;
    useEffect(() => {
        fetchData(props.open, props.id, props.setDataBeforeIterate, props.url);
    }, [props.open]);
    useEffect(() => {
        displayData(props.dataBeforeIterate, props.id, props.dataAfterIterate, props.seDataAfterIterate);
    }, [props.dataBeforeIterate]);
    return props.emptyArray ? (React.createElement("div", null,
        React.createElement("form", { onSubmit: props.onSubmit }, (_b = (_a = props.emptyArray) === null || _a === void 0 ? void 0 : _a.filter((element) => props.drupal_module_filter.includes(element === null || element === void 0 ? void 0 : element.ancetre) &&
            props.drupal_module_filter.includes(element === null || element === void 0 ? void 0 : element.key))) === null || _b === void 0 ? void 0 :
            _b.map((item, i) => (React.createElement("div", { key: i }, typeof (item === null || item === void 0 ? void 0 : item.content) === 'string' ? (React.createElement(TextInput, { defaultValue: removeHtmlTags(item === null || item === void 0 ? void 0 : item.content), label: item.key, onChange: (e) => {
                    props.setInputDataObject(item.parent === 'attributes'
                        ? Object.assign(Object.assign({}, props.inputDataObject), { type: 'node--article', id: props.id, [item.ancetre]: Object.assign(Object.assign({}, props.inputDataObject[item.ancetre]), { [item.key]: e.target.value }) }) : Object.assign(Object.assign({}, props.inputDataObject), { type: 'node--article', id: props.id, [item.ancetre]: Object.assign(Object.assign({}, props.inputDataObject[item.ancetre]), { [item.parent]: e.target.value }) }));
                } })) : null))),
            React.createElement("button", null, "send")))) : (React.createElement("div", null, "Loading..."));
}
