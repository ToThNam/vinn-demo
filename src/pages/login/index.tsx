import React from "react";

import LoginForm from 'modules/authentication/login-form';

export default function LoginLayout() {
  return (
    <div className="login">
      <div className="login-layout">
        <LoginForm />
      </div>
    </div>
  );
}
