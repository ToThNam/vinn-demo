import React, { ChangeEvent, useState } from "react";
import { Form } from "antd";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useAppSelector } from "store/hooks";
import { userDetail } from "store/user-slice/userSlice";
import { LockIcon, ViniviaIcon } from "assets/icons";
import PasswordInput from "components/form-control/password-input";
import { CommonButton } from "components/button";
import { regex } from "./constant";
import "./styles.scss";

export interface IValuePassword {
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePassword() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const userDetailData = useAppSelector(userDetail);
  const [isDescription, setIsDescription] = useState<boolean>(true);
  const [isCorrectNewPassword, setIsCorrectPassword] = useState<boolean>(false);
  const [isCorrectComfirmPassword, setIsCorrectComfirmPassword] =
    useState<boolean>(false);
  const [valuePassword, setValuePassword] = useState("");

  const handleChangeNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
    if (regex.test(e.target.value)) {
      setIsDescription(true);
      setIsCorrectPassword(true);
    } else {
      setIsDescription(false);
      setIsCorrectPassword(false);
    }
  };

  const handleChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    if (regex.test(e.target.value)) {
      setValuePassword(e.target.value);
      setIsDescription(true);
      setIsCorrectComfirmPassword(true);
    } else {
      setIsDescription(false);
      setIsCorrectComfirmPassword(false);
    }
  };

  const handleChangePassword = async () => {
    const newUser = { ...userDetailData, password: valuePassword };
    try {
      const { data } = await axios.put(
        "http://localhost:4000/api/change-password",
        {
          newUser
        }
      );
      if (data === "success") {
        navigate("/change-password-success");
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div className="container-change-password">
      <div className="image-change-password" />
      <div className="form-change-password">
        <div className="logo">
          <ViniviaIcon />
        </div>
        <div className="change-password-form">
          <Form.Item>
            <div className="title">My password is ...</div>
          </Form.Item>
          <Form className="form-password">
            <PasswordInput
              className={clsx(isCorrectNewPassword && "password-correct")}
              name="newPassword"
              rules={[
                { required: true, message: "This field is required" },
                {
                  pattern: regex,
                  message: ""
                }
              ]}
              onChange={handleChangeNewPassword}
              placeholder="Password"
              prefix={<LockIcon />}
              hasFeedback
            />
            <PasswordInput
              className={clsx(isCorrectComfirmPassword && "password-correct")}
              name="comfirmPassword"
              rules={[
                {
                  required: true,
                  message: "This field is required"
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Confirm password does not match")
                    );
                  }
                })
              ]}
              onChange={handleChangeConfirmPassword}
              placeholder="Comfirm password"
              prefix={<LockIcon />}
              hasFeedback
            />
          </Form>
          <div
            className={clsx("description", {
              "description-error": !isDescription
            })}
          >
            Password must be 8-16 characters long, and contain one uppercase and
            one lowercase character
          </div>
          <div className="button-form">
            <CommonButton variant="dashed" onClick={() => navigate(-1)}>
              Back
            </CommonButton>
            <CommonButton onClick={handleChangePassword}>Next</CommonButton>
          </div>
        </div>
      </div>
    </div>
  );
}
