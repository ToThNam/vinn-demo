import { Form, FormItemProps, Input } from "antd";
import { ChangeEventHandler, ReactNode } from "react";

import "./styles.scss";

export interface TextInputProps extends FormItemProps {
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  allowClear?: boolean;
}

export default function TextInput({
  placeholder,
  disabled,
  onChange,
  prefix,
  className,
  value,
  suffix,
  allowClear,
  ...props
}: TextInputProps) {
  return (
    <Form.Item className="form-input" {...props}>
      <Input
        allowClear={allowClear}
        placeholder={placeholder}
        disabled={disabled}
        className={className}
        onChange={onChange}
        value={value}
        prefix={prefix}
        suffix={suffix}
      />
    </Form.Item>
  );
}
