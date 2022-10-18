import React from 'react';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
interface propsButton {
  onClick: () => void;
  color: string;
  position?: string | any;
  top?: string | number;
  right?: string | number;
  left?: string | number;
  bottom?: string | number;
}
export const Button = ({
  onClick,
  color,
  position = 'absolute',
  top = 0,
  right = 0,
  left = 0,
  bottom = 0,
}: propsButton): JSX.Element => {
  return (
    <div
      style={{
        color: color,
        position: position,
        top: top,
        right: right,
        left: left,
        bottom: bottom,
      }}
    >
      <BorderColorOutlinedIcon onClick={onClick} />
    </div>
  );
};
export default Button;
