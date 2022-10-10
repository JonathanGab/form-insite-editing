import { SelectChangeEvent } from '@mui/material/Select';
import './SelectInput.css';
export interface ISelectProps {
    inputLabel?: string;
    label: string;
    value: string;
    onChange: (e: SelectChangeEvent) => void;
}
export default function SelectInput({ inputLabel, label, value, onChange, }: ISelectProps): JSX.Element;
