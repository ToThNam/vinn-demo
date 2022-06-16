import { Form, FormItemProps, Input } from "antd";
import { ChangeEventHandler, KeyboardEventHandler } from "react";

import './styles.scss';

export interface TextAreaInputProps extends FormItemProps {
  disabled?: boolean;
  placeholder?: string;
  autosize?: boolean | object;
  value?: string
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}
export function TextArea({ disabled, placeholder, autosize, value, onChange, ...props }: TextAreaInputProps) {
  return (
    <Form.Item className="form-input-wrapper" {...props}>
      <Input.TextArea
        className="text-area-custom"
        disabled={disabled}
        placeholder={placeholder}
        autoSize={autosize}
        value={value}
        onChange={onChange}
      />
    </Form.Item>
  );
}
TextArea.defaultProps = {
  disabled: false,
  placeholder: "",
  autoSize: false,
  value: "",
};
