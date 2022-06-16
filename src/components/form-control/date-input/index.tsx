import { Form, FormItemProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import generatePicker from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style/index';

import './styles.scss';

const DatePicker = generatePicker<Date>(dateFnsGenerateConfig);

export interface IDateInputProps extends FormItemProps {
  disabled?: boolean;
  initialValue?: string;
  onChange?: (date: Date | null, dateString: string) => void;
}

export default function DateInput({
  disabled,
  initialValue,
  onChange,
}: IDateInputProps) {
  return (
    <Form.Item
      initialValue={dayjs(new Date(initialValue as string), "DD/MM/YYYY")}
    >
      <DatePicker onChange={onChange} format="DD/MM/YYYY" disabled={disabled} />
    </Form.Item>
  );
}