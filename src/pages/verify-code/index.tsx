import React from "react";

import VerifyCodeForm from "modules/authentication/verify-code-form";

export default function VerifyCodeLayout() {
  return (
    <div className="login">
      <div className="login-layout">
        <VerifyCodeForm />
      </div>
    </div>
  );
}
