var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import TextInput from '../TextInput';
import NumberInput from '../NumberInput';
import SelectInput from '../SelectInput';
import ImageDrupal from '../ImageDrupal';
export default function GenericInputDrupal(_a) {
    var { type, itemAncetre, itemParent, itemKey, itemIsImage, drupal_string_input, drupal_number_input, drupal_boolean_input } = _a, props = __rest(_a, ["type", "itemAncetre", "itemParent", "itemKey", "itemIsImage", "drupal_string_input", "drupal_number_input", "drupal_boolean_input"]);
    switch (true) {
        case typeof type === 'string' &&
            //. if itemAncetre is strictly equal to included
            itemAncetre !== 'included' &&
            //. if drupal_string_input array doesn't includes itemKey
            drupal_string_input.includes(itemKey) &&
            itemParent !== 'meta':
            {
                return React.createElement(TextInput, Object.assign({}, props));
            }
        case typeof type === 'number' &&
            //. if drupal_number_input array from config doesn't includes itemParent
            !drupal_number_input.includes(itemParent) &&
            itemKey === 'meta':
            {
                return React.createElement(NumberInput, Object.assign({}, props));
            }
        case typeof type === 'boolean' &&
            //. if drupal_boolean_input array includes itemKey
            drupal_boolean_input.includes(itemKey):
            {
                return React.createElement(SelectInput, Object.assign({}, props));
            }
        case itemIsImage: {
            return React.createElement(ImageDrupal, Object.assign({}, props));
        }
        default: {
            //. return nothing
            return React.createElement(React.Fragment, null);
        }
    }
}
