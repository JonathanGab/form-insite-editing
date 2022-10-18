import React from 'react';
import './Drawer.css';

interface IDrawerProps {
  open: boolean;
  formOne: JSX.Element;
  closeModalOnClick: () => void;
  // CSS PROPS
  background: string;
  width: string;
  column: boolean;
  paperColor: string;
  language_array: string[];
  setNavigation: (value: string) => void;
}
export const Drawer = ({
  open,
  closeModalOnClick,
  formOne,
  background,
  width = 50 + '%',
  column = true,
  paperColor = 'transparent',
  language_array,
  setNavigation,
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
            <button onClick={closeModalOnClick}>x</button>
          </div>
          <div className="drawer-nav-container">
            <div className="drawer-navigation">
              <ul>
                {language_array.map((lang: string) => (
                  <li onClick={() => setNavigation(lang === 'fr' ? '' : lang)}>
                    {lang}
                  </li>
                ))}
              </ul>
            </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};
