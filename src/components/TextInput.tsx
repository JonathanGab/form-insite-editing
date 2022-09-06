import React from 'react';

interface IProps {
  inputLabel?: string;
  label: string;
  defaultValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

export default function TextInput(props: IProps): JSX.Element {
  return (
    <div className="input-container">
      <label className="input-label">{props.inputLabel}</label>
      <input
        type="text"
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        name={props.name}
      />
    </div>
  );
}
