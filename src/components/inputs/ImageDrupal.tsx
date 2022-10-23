import React, { MouseEvent, ChangeEvent } from 'react';
import './Image.css';
import TextField from '@mui/material/TextField';
export interface IImageProps {
  //. src is the url of the image
  src: string;
  //. updateImageOnClick is the function for open the modal and update image
  updateImageOnClick: (e: MouseEvent<HTMLImageElement>) => void;
  defaultValueAlt: string;
  labelImageDiv: string;
  onClickImageInput: (e: MouseEvent<HTMLInputElement>) => void;
  onChangeImageInput: (e: ChangeEvent<HTMLInputElement>) => void;
}
export default function ImageDrupal({
  //. props for Image.tsx
  src,
  labelImageDiv,
  updateImageOnClick,
  defaultValueAlt,
  onChangeImageInput,
  onClickImageInput,
}: IImageProps): JSX.Element {
  return (
    <div className="img-input">
      <div className="position">{labelImageDiv}</div>
      <img src={src} alt="logo" className="img" onClick={updateImageOnClick} />
      <div className="image-input">
        <TextField
          type="text"
          label="Alt"
          defaultValue={defaultValueAlt}
          onChange={onChangeImageInput}
          onClick={onClickImageInput}
          //. -------------- CSS --------------
          style={{ marginBottom: '3rem' }}
        />
      </div>
    </div>
  );
}
