import React from 'react';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
export const Button = ({ onClick, color, position = 'absolute', top = 0, right = 0, left = 0, bottom = 0, }) => {
    return (React.createElement("div", { style: {
            color: color,
            position: position,
            top: top,
            right: right,
            left: left,
            bottom: bottom,
        } },
        React.createElement(BorderColorOutlinedIcon, { onClick: onClick })));
};
export default Button;
