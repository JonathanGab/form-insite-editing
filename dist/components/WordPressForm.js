import React, { useEffect } from 'react';
import TextInput from './TextInput';
import NumberInput from './NumberInput';
import { displayData } from '../features/displayData';
import { fetchData } from '../features/fetchData';
import { removeHtmlTags } from '../features/removeHtmlTag';
export const WordPressForm = (props) => {
    var _a, _b;
    useEffect(() => {
        fetchData(props.open, props.id, props.setDrawerData, props.url);
    }, [props.open]);
    useEffect(() => {
        displayData(props.varState, props.id, props.varData, props.setData);
    }, [props.varState]);
    return props.parsedData ? (React.createElement("div", { className: "form-container" },
        props.lang,
        " HI",
        React.createElement("form", { onSubmit: props.onSubmit, className: "form" }, (_b = (_a = props.parsedData) === null || _a === void 0 ? void 0 : _a.filter((element) => props.wordpress_module_filter.includes(element === null || element === void 0 ? void 0 : element.ancetre) &&
            props.wordpress_module_filter.includes(element === null || element === void 0 ? void 0 : element.key))) === null || _b === void 0 ? void 0 :
            _b.map((item, i) => (React.createElement("div", { key: i }, typeof (item === null || item === void 0 ? void 0 : item.content) === 'string' ? (React.createElement("div", { className: "input-margin" },
                React.createElement(TextInput, { defaultValue: removeHtmlTags(item === null || item === void 0 ? void 0 : item.content), label: item.key === 'rendered' ? item === null || item === void 0 ? void 0 : item.ancetre : item === null || item === void 0 ? void 0 : item.key, onChange: (e) => {
                        props.setTabInput((item === null || item === void 0 ? void 0 : item.ancetre) === props.custom_fields
                            ? Object.assign(Object.assign({}, props.tabInput), { [item.ancetre]: Object.assign(Object.assign({}, props.tabInput[item.ancetre]), { [item === null || item === void 0 ? void 0 : item.key]: e.target.value }), status: props.draft }) : Object.assign(Object.assign({}, props.tabInput), { [item === null || item === void 0 ? void 0 : item.ancetre]: e.target.value, status: props.draft }));
                    } }))) : typeof (item === null || item === void 0 ? void 0 : item.content) === 'number' ? (React.createElement("div", { className: "input-margin" },
                React.createElement(NumberInput, { inputLabel: "", defaultValue: item === null || item === void 0 ? void 0 : item.content, label: item.key === 'rendered' ? item === null || item === void 0 ? void 0 : item.ancetre : item === null || item === void 0 ? void 0 : item.key, name: item === null || item === void 0 ? void 0 : item.ancetre, onChange: (e) => {
                        props.setTabInput((item === null || item === void 0 ? void 0 : item.ancetre) === props.custom_fields
                            ? Object.assign(Object.assign({}, props.tabInput), { [item.ancetre]: Object.assign(Object.assign({}, props.tabInput[item.ancetre]), { [item === null || item === void 0 ? void 0 : item.key]: e.target.value }), status: props.draft }) : Object.assign(Object.assign({}, props.tabInput), { [item === null || item === void 0 ? void 0 : item.ancetre]: e.target.value, status: props.draft }));
                    } }))) : null))),
            React.createElement("div", { className: "form-btn" },
                React.createElement("button", { className: "btn-send" }, "send"))))) : (React.createElement("div", null, "Loading..."));
};
