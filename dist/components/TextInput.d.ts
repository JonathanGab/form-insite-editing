import React from 'react';
import './TextInput.css';
interface IProps {
    inputLabel?: string;
    label: string;
    defaultValue: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}
export default function TextInput(props: IProps): JSX.Element;
export {};
