import React, { useState } from "react";
import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ViniviaIcon } from "assets/icons";
import PinInput from "react-pin-input";
import { CommonButton } from "components/button";
import "./styles.scss";

export default function VerifyCodeForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [pin, setPin] = useState<string>("");
  const verify = localStorage.getItem("dataVerify");
  const dataVerify = verify && JSON.parse(verify);

  const handleChangePin = (e: string) => {
    setPin(e);
  };
  const handleNext = async () => {
    try {
      const response = await axios.post("http://localhost:4000/verifyOTP", {
        phone: dataVerify.phone,
        hash: dataVerify.hash,
        otp: Number(pin)
      });
      const {
        data: { verification: verifyStatus }
      } = response;
      if (verifyStatus) {
        navigate("/change-password");
      }
    } catch (Error: any) {
      setError(Error.response.data);
    }
  };
  return (
    <div className="form-verify-code">
      <div className="logo">
        <ViniviaIcon />
      </div>
      <Form className="verify-code-form">
        {!error ? (
          <div>
            <div className="title-verify">
              Your verification code is sent by SMS to
            </div>
            <div className="phone-verify">{dataVerify.phone}</div>
          </div>
        ) : (
          <div className="title-verify">
            Verification code is wrong. Please try again
          </div>
        )}
        <Form.Item>
          <PinInput
            length={6}
            focus
            type="numeric"
            inputMode="number"
            inputStyle={{
              borderColor: error ? "#F44336" : "#E5E5E5",
              width: "48px",
              height: "64px",
              borderRadius: "8px",
              marginLeft: "10px"
            }}
            onChange={handleChangePin}
          />
        </Form.Item>
        <div className="description">
          Did not receive the code? <a className="resend-code">Resend</a> code
        </div>
        <div className="button-form">
          <CommonButton variant="dashed" onClick={() => navigate("/login")}>
            Back
          </CommonButton>
          <CommonButton variant="primary" onClick={handleNext}>
            Next
          </CommonButton>
        </div>
      </Form>
    </div>
  );
}
