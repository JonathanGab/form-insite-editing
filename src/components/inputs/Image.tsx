import React from 'react';
import './Image.css';
export interface IImageProps {
  src: string;
}
export default function Image({ src }: IImageProps): JSX.Element {
  return (
    <div className="img-input">
      <img src={src} alt="logo" className="img" />
    </div>
  );
}
