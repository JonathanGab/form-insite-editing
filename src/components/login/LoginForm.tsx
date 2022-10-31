import React, { useState, useEffect } from 'react';
import './loginForm.css';
import axios from 'axios';
import { encryptCodes, decryptCodes } from '../../features/encrypt';
import { storeData } from '../../features/storage';
//! ------------------------------------------ NEW ------------------------------------------

export function LoginForm(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [authId, setAuthId] = useState<string>('');
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
            Authorization: 'Basic ' + window.btoa(`${email}:${password}`),
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
          },
        }
      );
      setPassword(encryptCodes(password, 'secret'));
      setAuthId(res.data?.data?.id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (email !== null || email !== null) {
      storeData({
        email: email,
        password: password,
        auth_id: authId,
      });
    }
  }, [authId]);

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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form_input_margin">
              <label className="">Password</label>
              <input
                type="password"
                className="form_password_input"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form_btn_container">
              <button className="form_btn">Connexion</button>
            </div>
          </div>
        </div>
      </form>
      <div></div>
    </div>
  );
}
