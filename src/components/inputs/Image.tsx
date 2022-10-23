import React from 'react';
import './Image.css';

export interface IImageProps {
  //. src is the url of the image
  src: string;
  //. updateImageOnClick is the function for open the modal and update image
  updateImageOnClick: () => void;
}
export default function Image({
  //. props for Image.tsx
  src,
  updateImageOnClick,
}: IImageProps): JSX.Element {
  return (
    <div className="img-input">
      <img src={src} alt="logo" className="img" onClick={updateImageOnClick} />
    </div>
  );
}
