import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";

import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
//import { file } from '@babel/types';

const Chats = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  console.log("Fetched user", user);

  const handleLogout = async () => {
    await auth.signOut();

    navigate("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      navigate("/");

      return;
    }

    const loadData = async () => {
      try {
        let res = await axios.get("https://api.chatengine.io/users/me", {
          headers: {
            "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
            "user-name": user.email,
            "user-secret": user.uid,
          },
        });
        setLoading(false);
        console.log("Response", res);
      } catch (error) {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        await getFile(user.photoURL).then(async (avatar) => {
          formdata.append("avatar", avatar, avatar.name);

          await axios
            .post("https://api.chatengine.io/users", formdata, {
              headers: {
                "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY
              },
            })
            .then(() => {
              setLoading(false);
              console.log("success here");
            })
            .catch((error) => console.log(error));
        });
        console.log(error);
      }
    };

    loadData();
  }, [user, navigate]);

  if (!user || loading) return "Loading...";

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Unichat</div>
        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};
export default Chats;
