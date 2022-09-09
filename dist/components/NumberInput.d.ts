import React from 'react';
interface props {
    inputLabel: string;
    label: string;
    defaultValue: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
}
export default function NumberInput(props: props): JSX.Element;
export {};
