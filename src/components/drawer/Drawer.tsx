import React from 'react';
import './Drawer.css';

interface IDrawerProps {
  open: boolean;
  onClick: () => void;
  formOne?: JSX.Element;
  formTwo?: JSX.Element;
  // CSS PROPS
  background: string;
  width: string;
  column: boolean;
  paperColor: string;
}
export const Drawer = ({
  open,
  onClick,
  formOne,
  formTwo,
  background,
  width = 50 + '%',
  column = true,
  paperColor = 'transparent',
}: IDrawerProps): JSX.Element => {
  return (
    <div className={open ? 'container' : 'container-close'}>
      <div className="box" style={{ backgroundColor: paperColor }}>
        <div
          className={open ? `drawer-open` : `drawer-close`}
          // CUSTOMIZABLE CSS
          style={
            open
              ? {
                  backgroundColor: background,
                  width: width,
                }
              : {
                  width: 0,
                }
          }
        >
          <div>
            <button onClick={onClick}>x</button>
          </div>
          <div
            className="drawer-col"
            // CUSTOMIZABLE CSS
            style={
              column === true
                ? {
                    flexDirection: 'column',
                  }
                : {
                    flexDirection: 'row',
                  }
            }
          >
            {formOne}
            {formTwo}
          </div>
        </div>
      </div>
    </div>
  );
};
