interface IGenericInputProps {
    type: string | number | boolean;
    itemAncetre: string;
    itemParent: string;
    itemKey: string;
    rows?: number;
    [x: string]: any;
}
export default function GenericInputWordPress({ type, itemAncetre, itemParent, itemKey, ...props }: IGenericInputProps): JSX.Element;
export {};
