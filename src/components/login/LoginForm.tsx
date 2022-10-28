import React, { useState, useEffect } from 'react';
import './loginForm.css';
import axios from 'axios';
import { encryptCodes } from '../../features/encrypt';
import { storeData } from '../../features/storage';
//! ------------------------------------------ NEW ------------------------------------------
interface ILoginProps {
  email: string;
  password: string;
  authId: string;
  setAuthId: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}
export function LoginForm(props: ILoginProps): JSX.Element {
  // DONE : encrypt / decrypt
  // TODO : dixea.com
  // TODO : multi language !== wpml ou polylang

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost/drupalSite/jsonapi/node/article',
        {
          data: {
            type: 'node--article',
            attributes: {
              title: 'test auth',
              status: false,
            },
          },
        },
        {
          headers: {
            Authorization:
              'Basic ' + window.btoa(`${props.email}:${props.password}`),
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
          },
        }
      );
      props.setPassword(encryptCodes(props.password, 'secret'));
      props.setAuthId(res.data?.data?.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.email !== null || props.email !== null) {
      storeData({
        email: props.email,
        password: props.password,
        auth_id: props.authId,
      });
    }
  }, [props.authId]);

  return (
    <div>
      <form className="form_box" onSubmit={handleLogin}>
        <div className="form_login">
          <div className="form_title">
            <h2 className="form_header">Connectez-vous</h2>
          </div>
          <div className="form_body">
            <div className="form_input_margin">
              <label className="">Email</label>
              <input
                type="text"
                className="form_email_input"
                onChange={(e) => props.setEmail(e.target.value)}
              />
            </div>
            <div className="form_input_margin">
              <label className="">Password</label>
              <input
                type="password"
                className="form_password_input"
                onChange={(e) => props.setPassword(e.target.value)}
              />
            </div>
            <div className="form_btn_container">
              <button className="form_btn">Connexion</button>
            </div>
          </div>
        </div>
      </form>
      <div>
        {/* <button type="button" onClick={deleteDataFromLocalStorage}>
          {' '}
          log out
        </button> */}
      </div>
    </div>
  );
}
