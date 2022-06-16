import React, { useState } from "react";
import { Form, Button } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import clsx from "clsx";

import TextInput from "components/form-control/text-input";
import { LockIcon, ViniviaIcon } from "assets/icons";
import { UserIcon } from "assets/icons/UserIcon";
import PasswordInput from "components/form-control/password-input";
import { CommonButton } from "components/button";
import "./styles.scss";

export default function LoginForm() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          account,
          password
        }
      );
      localStorage.setItem(
        "login",
        JSON.stringify({
          userLogin: true,
          token: response.data.access_token
        })
      );
      setError("");
      setAccount("");
      setPassword("");
      navigate("/");
    } catch (Error: any) {
      setError(Error.response.data.message);
    }
  };
  return (
    <div className="container-login">
      <div className="image-login" />
      <div className="form-login">
        <div className="logo-login">
          <ViniviaIcon />
        </div>
        <Form
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
        >
          <TextInput
            className={clsx("valid", {
              "valid-false": error
            })}
            name="username"
            rules={[{ required: true, message: "This field is required" }]}
            placeholder="Phone number or email"
            allowClear={false}
            prefix={<UserIcon />}
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
          <PasswordInput
            className={clsx("valid", {
              "valid-false": error
            })}
            rules={[{ required: true, message: "This field is required" }]}
            name="password"
            placeholder="Password"
            prefix={<LockIcon />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="description-error">{error}</p>}
          <Form.Item>
            <Button
              className="login-form-forgot"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </Button>
          </Form.Item>
          <Form.Item>
            <CommonButton
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Sign in
            </CommonButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
