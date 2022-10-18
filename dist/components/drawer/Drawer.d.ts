import './Drawer.css';
interface IDrawerProps {
    open: boolean;
    formOne: JSX.Element;
    closeModalOnClick: () => void;
    background: string;
    width: string;
    column: boolean;
    paperColor: string;
    language_array: string[];
    setNavigation: (value: string) => void;
}
export declare const Drawer: ({ open, closeModalOnClick, formOne, background, width, column, paperColor, language_array, setNavigation, }: IDrawerProps) => JSX.Element;
export {};
