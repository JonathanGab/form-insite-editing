import React, { useEffect, useState } from 'react';
import './Drawer.css';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
interface IDrawerProps {
  open: boolean;
  formOne: JSX.Element;
  closeModalOnClick: () => void;
  // CSS PROPS
  background: string;
  width_desktop: string;
  column: boolean;
  paperColor: string;
  language_array: string[];
  setNavigation: (value: string) => void;
  header_nav_background: string;
  drawer_title: string;
  drupal_module_language_array: string[];
}
export const Drawer = ({
  open,
  closeModalOnClick,
  formOne,
  background,
  width_desktop = 50 + '%',
  column = true,
  paperColor = 'transparent',
  setNavigation,
  header_nav_background,
  drawer_title = 'Front end editing',
  drupal_module_language_array,
}: IDrawerProps): JSX.Element | any => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  //. ---------------------------------------- FEATURE ----------------------------------------
  function isMobileOrDesktop() {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }
  //. ---------------------------------------- USE EFFECT ----------------------------------------
  //? useEffect for resize the drawer
  useEffect(() => {
    window.addEventListener('resize', isMobileOrDesktop);
    return () => {
      window.removeEventListener('resize', isMobileOrDesktop);
    };
  }, [isMobile]);

  //? useEffect for active nav in drawer
  useEffect(() => {
    const drawer_list_item = document.querySelectorAll(
      '.drawer-list-item'
    ) as NodeListOf<HTMLLIElement>;
    // first item is active by default
    drawer_list_item[0].classList.add('active');
    // add color to first item active
    drawer_list_item[0].style.backgroundColor = header_nav_background;
    // change color to active item
    drawer_list_item.forEach((item: any) => {
      item.addEventListener('click', () => {
        drawer_list_item.forEach((item: any) => {
          item.classList.remove('active');
          if (!item.classList.contains('active')) {
            item.style.backgroundColor = 'transparent';
          }
        });
        item.classList.add('active');
        if (item.classList.contains('active')) {
          item.style.backgroundColor = header_nav_background;
        }
      });
    });
  }, []);
  //. -------------------------------------------------------------------------------------------

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
                  width: isMobile ? '100%' : width_desktop,
                }
              : {
                  width: 0,
                }
          }
        >
          <div className="drawer-header">
            <div className="drawer-navigation-header">
              <div>
                <button onClick={closeModalOnClick}>
                  <ClearOutlinedIcon fontSize="large" />
                </button>
              </div>
              <div className="drawer-title">{drawer_title}</div>
            </div>
            <div className="drawer-nav-container">
              <div className="drawer-navigation">
                <ul className="drawer-nav-list">
                  {drupal_module_language_array.map((lang, index) => (
                    <li
                      onClick={() => setNavigation(lang === 'fr' ? '' : lang)}
                      key={index}
                      className="drawer-list-item"
                    >
                      {lang}
                    </li>
                  ))}
                </ul>
              </div>
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
