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
export default function GenericInputWordPress(_a) {
    var { type, itemAncetre, itemParent, itemKey } = _a, props = __rest(_a, ["type", "itemAncetre", "itemParent", "itemKey"]);
    switch (true) {
        case typeof type === 'string' && itemAncetre !== 'better_featured_image': {
            return React.createElement(TextInput, Object.assign({}, props));
        }
        case typeof type === 'number': {
            return React.createElement(NumberInput, Object.assign({}, props));
        }
        case typeof type === 'boolean': {
            return React.createElement(SelectInput, Object.assign({}, props));
        }
        case itemAncetre === 'better_featured_image' &&
            itemParent === 'better_featured_image' &&
            itemKey === 'source_url':
            {
                return React.createElement(Image, Object.assign({}, props));
            }
        default: {
            return React.createElement(React.Fragment, null);
        }
    }
}
