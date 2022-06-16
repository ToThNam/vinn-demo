import { Form, FormItemProps, Select } from "antd";
import { MouseEventHandler } from "react";

import "./styles.scss";

export interface ISelectProps extends FormItemProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
  onChange?: (value: string) => void;
  options?: Array<string>;
  disabled?: boolean;
  value?: string;
  title?: string;
}

export default function CommonSelect({
  onClick,
  onChange,
  options,
  disabled,
  value,
  title,
  ...props
}: ISelectProps) {
  const { Option } = Select;
  return (
    <Form.Item className="form-select" {...props}>
      <Select
        placeholder={title}
        onClick={onClick}
        onChange={onChange}
        disabled={disabled}
        value={value}
      >
        {options?.map((option, index) => (
          <Option value={option} key={index}>
            <span className={option}>{option}</span>
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
}
