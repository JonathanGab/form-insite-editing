import { MouseEvent, ChangeEvent } from 'react';
import './Image.css';
export interface IImageProps {
    src: string;
    updateImageOnClick: (e: MouseEvent<HTMLImageElement>) => void;
    defaultValueAlt: string;
    labelImageDiv: string;
    onClickImageInput: (e: MouseEvent<HTMLInputElement>) => void;
    onChangeImageInput: (e: ChangeEvent<HTMLInputElement>) => void;
}
export default function ImageDrupal({ src, labelImageDiv, updateImageOnClick, defaultValueAlt, onChangeImageInput, onClickImageInput, }: IImageProps): JSX.Element;
