import React, { useEffect, useState } from 'react';
import './Drawer.css';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
export const Drawer = ({ open, closeModalOnClick, formOne, background, width_desktop = 50 + '%', column = true, paperColor = 'transparent', setNavigation, header_nav_background, drawer_title = 'Front end editing', drupal_module_language_array, }) => {
    const [isMobile, setIsMobile] = useState(false);
    //. ---------------------------------------- FEATURE ----------------------------------------
    function isMobileOrDesktop() {
        if (window.innerWidth < 768) {
            setIsMobile(true);
        }
        else {
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
        const drawer_list_item = document.querySelectorAll('.drawer-list-item');
        // first item is active by default
        drawer_list_item[0].classList.add('active');
        // add color to first item active
        drawer_list_item[0].style.backgroundColor = header_nav_background;
        // change color to active item
        drawer_list_item.forEach((item) => {
            item.addEventListener('click', () => {
                drawer_list_item.forEach((item) => {
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
    return (React.createElement("div", { className: open ? 'container' : 'container-close' },
        React.createElement("div", { className: "box", style: { backgroundColor: paperColor } },
            React.createElement("div", { className: open ? `drawer-open` : `drawer-close`, 
                // CUSTOMIZABLE CSS
                style: open
                    ? {
                        backgroundColor: background,
                        width: isMobile ? '100%' : width_desktop,
                    }
                    : {
                        width: 0,
                    } },
                React.createElement("div", { className: "drawer-header" },
                    React.createElement("div", { className: "drawer-navigation-header" },
                        React.createElement("div", null,
                            React.createElement("button", { onClick: closeModalOnClick },
                                React.createElement(ClearOutlinedIcon, { fontSize: "large" }))),
                        React.createElement("div", { className: "drawer-title" }, drawer_title)),
                    React.createElement("div", { className: "drawer-nav-container" },
                        React.createElement("div", { className: "drawer-navigation" },
                            React.createElement("ul", { className: "drawer-nav-list" }, drupal_module_language_array.map((lang, index) => (React.createElement("li", { onClick: () => setNavigation(lang === 'fr' ? '' : lang), key: index, className: "drawer-list-item" }, lang))))))),
                React.createElement("div", { className: "drawer-col", 
                    // CUSTOMIZABLE CSS
                    style: column === true
                        ? {
                            flexDirection: 'column',
                        }
                        : {
                            flexDirection: 'row',
                        } }, formOne)))));
};
