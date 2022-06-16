import { Modal, ModalProps } from "antd";

import "./styles.scss";

interface ConfirmModalProps extends ModalProps {
  okText?: string | React.ReactNode;
  cancelText?: string | React.ReactNode;
  children: string | React.ReactNode;
};

export function ConfirmModal({
  okText,
  cancelText,
  children,
  ...props
}: ConfirmModalProps) {
  return (
    <Modal
      centered
      width={353}
      okText={okText || "Save"}
      cancelText={cancelText || "Cancel"}
      className="confirm-modal-wrapper"
      {...props}
    >
      <span className="mess-modal">{children}</span>
    </Modal>
  );
}
ConfirmModal.defaultProps = {
  okText: "Save",
  cancelText: "Cancel"
};