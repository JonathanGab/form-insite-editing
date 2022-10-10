import { Dispatch, SetStateAction } from 'react';
import './Modal.css';
interface IModalProps {
    open: boolean;
    onClick: () => void;
    uploadId: number | string;
    setUploadId: Dispatch<SetStateAction<number | string>>;
    mediaId: number | string;
    setMediaId: Dispatch<SetStateAction<number | string>>;
}
export default function Modal(props: IModalProps): JSX.Element;
export {};
