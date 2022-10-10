import './Drawer.css';
interface IDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    formOne?: JSX.Element;
    formTwo?: JSX.Element;
    background: string;
    width: string;
    column: boolean;
    paperColor: string;
}
export declare const Drawer: ({ open, setOpen, formOne, formTwo, background, width, column, paperColor, }: IDrawerProps) => JSX.Element;
export {};
