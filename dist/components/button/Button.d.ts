interface propsButton {
    onClick: () => void;
    color: string;
    position?: string | any;
    top?: string | number;
    right?: string | number;
}
export declare const Button: ({ onClick, color, position, top, right, }: propsButton) => JSX.Element;
export default Button;
