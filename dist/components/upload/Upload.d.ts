import { Dispatch, SetStateAction } from 'react';
import './Upload.css';
interface IUploadProps {
    files: File | null;
    setFiles: Dispatch<SetStateAction<File | null>>;
}
export default function Upload(props: IUploadProps): JSX.Element;
export {};
