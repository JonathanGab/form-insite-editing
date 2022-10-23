import React, { ChangeEvent } from 'react';
import './Input.css';
import TextField from '@mui/material/TextField';

export interface ITextInputProps {
  TextInputlabel: string;
  defaultValueTextInput: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rows?: number;
}
export default function TextInput(props: ITextInputProps): JSX.Element {
  return (
    <div className="input-container">
      <TextField
        type="text"
        // input props
        label={props.TextInputlabel}
        defaultValue={props.defaultValueTextInput}
        onChange={props.onChange}
        // for style of input
        rows={props.rows}
        multiline={true}
        disabled={props.TextInputlabel === 'id' ? true : false}
      />
    </div>
  );
}
