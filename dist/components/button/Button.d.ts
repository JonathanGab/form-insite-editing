interface propsButton {
    onClick: () => void;
    color: string;
    position?: string | any;
    top?: string | number;
    right?: string | number;
    left?: string | number;
    bottom?: string | number;
}
export declare const Button: ({ onClick, color, position, top, right, left, bottom, }: propsButton) => JSX.Element;
export default Button;
