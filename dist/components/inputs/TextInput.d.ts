import React from 'react';
import './Input.css';
export interface ITextInputProps {
    label: string;
    defaultValue: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    rows?: number;
}
export default function TextInput(props: ITextInputProps): JSX.Element;
