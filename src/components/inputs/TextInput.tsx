import React from 'react';
import './TextInput.css';
import TextField from '@mui/material/TextField';
interface IProps {
  inputLabel?: string;
  label: string;
  defaultValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput(props: IProps): JSX.Element {
  return (
    <div className="input-container">
      <label className="input-label">{props.inputLabel}</label>
      <TextField
        type="text"
        label={props.label}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        className="input"
      />
    </div>
  );
}
