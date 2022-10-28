import React from 'react';
import './Input.css';
export interface ITextInputProps {
    TextInputlabel: string;
    defaultValueTextInput: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    rows?: number;
    disabled?: boolean;
    error?: boolean;
}
export default function TextInput(props: ITextInputProps): JSX.Element;
