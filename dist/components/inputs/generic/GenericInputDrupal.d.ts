interface IGenericInputProps {
    type: string | number | boolean;
    itemAncetre: string;
    itemParent: string;
    itemKey: string;
    drupal_string_input: string[];
    drupal_number_input: string[];
    drupal_boolean_input: string[];
    [x: string]: any;
}
export default function GenericInputDrupal({ type, itemAncetre, itemParent, itemKey, drupal_string_input, drupal_number_input, drupal_boolean_input, ...props }: IGenericInputProps): JSX.Element;
export {};
