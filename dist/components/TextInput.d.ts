import React from 'react';
interface IProps {
    inputLabel?: string;
    label: string;
    defaultValue: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
}
export default function TextInput(props: IProps): JSX.Element;
export {};
