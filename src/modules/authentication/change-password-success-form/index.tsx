import React from "react";
import { Form } from "antd";
import { useNavigate } from 'react-router-dom';

import { ViniviaIcon } from "assets/icons";
import { CommonButton } from "components/button";
import './styles.scss';

export default function ChangePasswordSuccessForm() {
  const navigate = useNavigate();
  return (
    <div className="form-change-password-success">
      <div className="logo">
        <ViniviaIcon />
      </div>
      <Form className="change-password-success-form">
        <div className="image-change-password-success" />
      </Form>
      <div className="description-change-password">You have successfully</div>
      <div className="description-change-password">change your password</div>
      <Form.Item className="button-form">
        <CommonButton variant="primary" onClick={() => navigate('/login')}  >
          Done
        </CommonButton>
      </Form.Item>
    </div>
  );
}
