var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState, useEffect } from 'react';
import './loginForm.css';
import axios from 'axios';
import { encryptCodes } from '../../features/encrypt';
import { storeData } from '../../features/storage';
//! ------------------------------------------ NEW ------------------------------------------
export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authId, setAuthId] = useState('');
    const handleLogin = (e) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        e.preventDefault();
        try {
            const res = yield axios.post('http://localhost/drupalSite/jsonapi/node/article', {
                data: {
                    type: 'node--article',
                    attributes: {
                        title: 'test auth',
                        status: false,
                    },
                },
            }, {
                headers: {
                    Authorization: 'Basic ' + window.btoa(`${email}:${password}`),
                    Accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                },
            });
            setPassword(encryptCodes(password, 'secret'));
            setAuthId((_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.id);
        }
        catch (error) {
            console.error(error);
        }
    });
    useEffect(() => {
        if (email !== null || email !== null) {
            storeData({
                email: email,
                password: password,
                auth_id: authId,
            });
        }
    }, [authId]);
    return (React.createElement("div", null,
        React.createElement("form", { className: "form_box", onSubmit: handleLogin },
            React.createElement("div", { className: "form_login" },
                React.createElement("div", { className: "form_title" },
                    React.createElement("h2", { className: "form_header" }, "Connectez-vous")),
                React.createElement("div", { className: "form_body" },
                    React.createElement("div", { className: "form_input_margin" },
                        React.createElement("label", { className: "" }, "Email"),
                        React.createElement("input", { type: "text", className: "form_email_input", onChange: (e) => setEmail(e.target.value) })),
                    React.createElement("div", { className: "form_input_margin" },
                        React.createElement("label", { className: "" }, "Password"),
                        React.createElement("input", { type: "password", className: "form_password_input", onChange: (e) => setPassword(e.target.value) })),
                    React.createElement("div", { className: "form_btn_container" },
                        React.createElement("button", { className: "form_btn" }, "Connexion"))))),
        React.createElement("div", null)));
}
