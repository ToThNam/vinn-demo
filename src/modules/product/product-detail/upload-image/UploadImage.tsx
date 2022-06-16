import React from "react";
import { Upload, UploadProps, message } from "antd";

interface UpLoadFileProps extends UploadProps {
  onChange: (file: any) => void;
  children: React.ReactNode;
  name: string;
  accessToken: string;
  uploadUrl: string;
  limitSize: number;
  accept: string;
}
export default function UploadImage({
  onChange,
  children,
  name,
  accessToken,
  uploadUrl,
  limitSize = 2,
  accept = ".png, .jpg",
  ...props
}: UpLoadFileProps) {
  const UploadProp = {
    name,
    accept,
    action: uploadUrl,
    headers: {
      authorization: `Bearer ${accessToken}`
    },
    onChange,
    showUploadList: false,
    beforeUpload: (file: any) => {
      const limitedSize: boolean = file.size / 1024 / 1024 < Number(limitSize);
      if (!limitedSize) {
        message.error({
          content: `The picture should be in certain format (including PNG, JPG) and no larger than ${limitSize}MB`,
          style: {
            textAlign: "right"
          }
        });
      }
      return limitedSize;
    }
  };

  return (
    <Upload {...UploadProp} {...props}>
      {children}
    </Upload>
  );
}
