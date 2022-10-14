import React, { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';

import './Input.css';
export interface INumberInputProps {
  //. props INumberInputProps for NumberInput.tsx
  label: string;
  defaultValue: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  rows?: number;
}
export default function NumberInput(props: INumberInputProps): JSX.Element {
  return (
    <div className="input-container">
      <TextField
        id="outlined-basic"
        type="number"
        variant="outlined"
        // input props
        label={props.label}
        defaultValue={Number(props.defaultValue)}
        onChange={props.onChange}
        disabled={props.label === 'id' ? true : false}
        rows={props.rows}
      />
    </div>
  );
}
