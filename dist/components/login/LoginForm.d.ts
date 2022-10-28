import React from 'react';
import './loginForm.css';
interface ILoginProps {
    email: string;
    password: string;
    authId: string;
    setAuthId: React.Dispatch<React.SetStateAction<string>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
}
export declare function LoginForm(props: ILoginProps): JSX.Element;
export {};
