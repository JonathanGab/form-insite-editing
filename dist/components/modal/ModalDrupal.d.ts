import { Dispatch, SetStateAction } from 'react';
import './Modal.css';
interface IModalProps {
    open: boolean;
    route_to_media: string;
    api_url: string;
    onClick: (e: any) => void;
    onClose: (e: any) => void;
    chemin_url: string;
    setUploadId: Dispatch<SetStateAction<string>>;
    mediaId: string | number;
    setMediaId: Dispatch<SetStateAction<string | number>>;
    setGetImage: Dispatch<SetStateAction<object>>;
}
export default function ModalDrupal(props: IModalProps): JSX.Element;
export {};
