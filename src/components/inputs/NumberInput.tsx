import React from 'react';
import TextField from '@mui/material/TextField';
import './Input.css';
interface props {
  inputLabel: string;
  label: string;
  defaultValue: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}
export default function NumberInput(props: props): JSX.Element {
  return (
    <div className="input-container">
      <label className="input-label">{props.inputLabel}</label>
      <TextField
        id="outlined-basic"
        type="number"
        label={props.label}
        variant="outlined"
        defaultValue={Number(props.defaultValue)}
        onChange={props.onChange}
        name={props.name}
      />
    </div>
  );
}
