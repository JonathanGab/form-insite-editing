/// <reference types="react" />
import './Image.css';
export interface IImageProps {
    src: string;
    updateImageOnClick: () => void;
}
export default function Image({ src, updateImageOnClick, }: IImageProps): JSX.Element;
