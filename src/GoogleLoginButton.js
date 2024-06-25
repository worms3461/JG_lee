import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = () => {
  const onSuccess = (response) => {
    console.log("Login Success:", response.credential);
    // 서버에 액세스 토큰을 전송하여 인증을 처리합니다.
    fetch("http://localhost:3000/auth/google/callback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: response.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Server response:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onFailure = (response) => {
    console.error("Login Failed:", response);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin onSuccess={onSuccess} onError={onFailure} />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
