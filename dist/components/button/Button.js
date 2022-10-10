import React from 'react';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
export const Button = ({ onClick, color, position = 'absolute', top = 0, right = '20px', }) => {
    return (React.createElement("div", { style: {
            color: color,
            position: position,
            top: top,
            right: right,
        } },
        React.createElement(BorderColorOutlinedIcon, { onClick: onClick })));
};
export default Button;
