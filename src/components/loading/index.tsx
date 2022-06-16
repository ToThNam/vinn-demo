import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import "./styles.scss";

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} />;

export default function Loading({ ...props }) {
  return <Spin indicator={antIcon} {...props} />;
}
