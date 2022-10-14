import { ChangeEvent } from 'react';
import './Input.css';
export interface INumberInputProps {
    label: string;
    defaultValue: number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    rows?: number;
}
export default function NumberInput(props: INumberInputProps): JSX.Element;
