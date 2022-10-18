import React from 'react';
import './Drawer.css';
export const Drawer = ({ open, closeModalOnClick, formOne, background, width = 50 + '%', column = true, paperColor = 'transparent', language_array, setNavigation, }) => {
    return (React.createElement("div", { className: open ? 'container' : 'container-close' },
        React.createElement("div", { className: "box", style: { backgroundColor: paperColor } },
            React.createElement("div", { className: open ? `drawer-open` : `drawer-close`, 
                // CUSTOMIZABLE CSS
                style: open
                    ? {
                        backgroundColor: background,
                        width: width,
                    }
                    : {
                        width: 0,
                    } },
                React.createElement("div", null,
                    React.createElement("button", { onClick: closeModalOnClick }, "x")),
                React.createElement("div", { className: "drawer-nav-container" },
                    React.createElement("div", { className: "drawer-navigation" },
                        React.createElement("ul", null, language_array.map((lang) => (React.createElement("li", { onClick: () => setNavigation(lang === 'fr' ? '' : lang) }, lang)))))),
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
