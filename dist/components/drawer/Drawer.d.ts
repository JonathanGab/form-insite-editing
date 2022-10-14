import './Drawer.css';
interface IDrawerProps {
    open: boolean;
    formOne?: JSX.Element;
    formTwo?: JSX.Element;
    closeModalOnClick: () => void;
    background: string;
    width: string;
    column: boolean;
    paperColor: string;
}
export declare const Drawer: ({ open, closeModalOnClick, formOne, formTwo, background, width, column, paperColor, }: IDrawerProps) => JSX.Element;
export {};
