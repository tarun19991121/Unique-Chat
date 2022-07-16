import React from 'react';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
//import "firebase/app"
//import firebase from "firebase/app";
import "firebase/compat/app";
import firebase from "firebase/compat/app";

import { auth } from '../firebase';
//import { FirebaseError } from 'firebase/compat/app';


const Login = () => {
    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Welcome to UniChat!</h2>

                <div
                    className="login-button google"
                    onClick={ async () => { auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
                    }}
                >
                    <GoogleOutlined/> Sign In With Google Account

                </div>

                <br /> <br />

                <div
                    className="login-button facebook"
                    onClick={ async () => {auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
                    }}
                >
                    <FacebookOutlined/> Sign In With Facebook Account

                </div>
            </div>
        </div>
    );
}

export default Login;