import { Dispatch, SetStateAction, MouseEvent } from 'react';
import './Modal.css';
interface IModalProps {
    open: boolean;
    route_to_media: string;
    api_url: string;
    onClick: (e: MouseEvent) => void;
    onClickModal: (e: MouseEvent) => void;
    chemin_url: string;
    setUploadId: Dispatch<SetStateAction<number | string>>;
    mediaId: number | string;
    setMediaId: Dispatch<SetStateAction<number | any>>;
    setGetImage: Dispatch<SetStateAction<object>>;
}
export default function ModalDrupal(props: IModalProps): JSX.Element;
export {};
