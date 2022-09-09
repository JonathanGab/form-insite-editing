import React from "react";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
interface propsButton  {
  onClick: () => void;
  className: string;
};
export const Button = ({ className, onClick }: propsButton): JSX.Element => {
  return (
    <div className={className}>
      <BorderColorOutlinedIcon onClick={onClick} />
    </div>
  );
}
export default Button