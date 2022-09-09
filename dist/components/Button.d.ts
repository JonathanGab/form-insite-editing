interface propsButton {
    onClick: () => void;
    className: string;
}
export declare const Button: ({ className, onClick }: propsButton) => JSX.Element;
export default Button;
