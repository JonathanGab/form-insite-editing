import React from "react";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
;
export const Button = ({ className, onClick }) => {
    return (React.createElement("div", { className: className },
        React.createElement(BorderColorOutlinedIcon, { onClick: onClick })));
};
export default Button;
