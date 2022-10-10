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
import Image from '../Image';
export default function GenericInputDrupal(_a) {
    var { type, itemAncetre, itemGrandParent, itemParent, itemKey, drupal_string_input, drupal_number_input, drupal_boolean_input, drupal_image_field } = _a, props = __rest(_a, ["type", "itemAncetre", "itemGrandParent", "itemParent", "itemKey", "drupal_string_input", "drupal_number_input", "drupal_boolean_input", "drupal_image_field"]);
    switch (true) {
        case typeof type === 'string' &&
            itemAncetre !== 'included' &&
            !drupal_string_input.includes(itemGrandParent):
            {
                return React.createElement(TextInput, Object.assign({}, props));
            }
        case typeof type === 'number' &&
            !drupal_number_input.includes(itemGrandParent):
            {
                return React.createElement(NumberInput, Object.assign({}, props));
            }
        case typeof type === 'boolean' &&
            drupal_boolean_input.includes(itemGrandParent):
            {
                return React.createElement(SelectInput, Object.assign({}, props));
            }
        case drupal_image_field.includes(itemAncetre) &&
            drupal_image_field.includes(itemParent) &&
            drupal_image_field.includes(itemKey):
            {
                return React.createElement(Image, Object.assign({}, props));
            }
        default: {
            return React.createElement(React.Fragment, null);
        }
    }
}
