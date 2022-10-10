import React from 'react';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
interface propsButton {
  onClick: () => void;
  color: string;
  position?: string | any;
  top?: string | number;
  right?: string | number;
}
export const Button = ({
  onClick,
  color,
  position = 'absolute',
  top = 0,
  right = '20px',
}: propsButton): JSX.Element => {
  return (
    <div
      style={{
        color: color,
        position: position,
        top: top,
        right: right,
      }}
    >
      <BorderColorOutlinedIcon onClick={onClick} />
    </div>
  );
};
export default Button;
