import React from "react";

import ForgotPassword from 'modules/authentication/forgot-password-form';

export default function ForgotPasswordLayout() {
  return (
    <div className="login">
      <div className="login-layout">
        <ForgotPassword />
      </div>
    </div>
  );
}
