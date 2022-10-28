/// <reference types="react" />
import './Drawer.css';
interface IDrawerProps {
    open: boolean;
    formOne: JSX.Element;
    closeModalOnClick: () => void;
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
export declare const Drawer: ({ open, closeModalOnClick, formOne, background, width_desktop, column, paperColor, setNavigation, header_nav_background, drawer_title, drupal_module_language_array, }: IDrawerProps) => JSX.Element | any;
export {};
