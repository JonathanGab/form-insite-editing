import './Drawer.css';
interface IDrawerProps {
    open: boolean;
    onClick: () => void;
    formOne?: JSX.Element;
    formTwo?: JSX.Element;
    background: string;
    width: string;
    column: boolean;
    paperColor: string;
}
export declare const Drawer: ({ open, onClick, formOne, formTwo, background, width, column, paperColor, }: IDrawerProps) => JSX.Element;
export {};
