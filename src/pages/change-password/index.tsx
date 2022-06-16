import React from "react";

import ChangePassword from 'modules/authentication/change-password-form';

export default function ChangePasswordLayout() {
  return (
    <div className="login">
      <div className="login-layout">
        <ChangePassword />
      </div>
    </div>
  );
}
