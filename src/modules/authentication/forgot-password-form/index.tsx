import React, { useState } from "react";
import { Form, Button } from "antd";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import axios from "axios";

import TextInput from "components/form-control/text-input";
import { ViniviaIcon } from "assets/icons";
import { CommonButton } from "components/button";
import { useAppDispatch } from "store/hooks";
import { getUserDetail } from "store/user-slice/userSlice";
import "./styles.scss";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleNext = async () => {
    try {
      const response = await axios.post("http://localhost:4000/sendOTP", {
        phone
      });
      const { data } = response;
      dispatch(getUserDetail(data?.user));
      localStorage.setItem("dataVerify", JSON.stringify(data));
      navigate("/verify-code");
    } catch (Error: any) {
      setError(Error?.response?.data.message);
    }
  };

  return (
    <div className="container-forgot-password">
      <div className="image-forgot-password" />
      <div className="form-forgot">
        <div className="logo">
          <ViniviaIcon />
        </div>
        <Form.Item>
          <div className="title">Please enter</div>
          <div className="title">phone number or email</div>
          <div className="title">to reset password !</div>
        </Form.Item>
        <Form className="forgot-form">
          <TextInput
            className={clsx("iscorrectPhone", {
              "iscorrectPhone-error": error
            })}
            placeholder="+84123456789"
            prefix
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {error && <p className="description-error">{error}</p>}
          <div className="button-form">
            <CommonButton variant="dashed" onClick={() => navigate(-1)}>
              Back
            </CommonButton>
            <CommonButton variant="primary" onClick={handleNext}>
              Next
            </CommonButton>
          </div>
        </Form>
      </div>
    </div>
  );
}
