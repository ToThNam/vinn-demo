import { Modal, ModalProps } from "antd";

import './styles.scss';

interface NotificationModalProps extends ModalProps {
  cancelText?: string | React.ReactNode;
  children: string | React.ReactNode;
}

export function NotificationModal({
  children,
  cancelText,
  ...props
}: NotificationModalProps) {
  return (
    <Modal
      centered
      width={494}
      cancelText={cancelText || "Close"}
      className="notification-modal-wrapper"
      {...props}
    >
      <span className="mess-modal">{children}</span>
    </Modal>
  );
}
NotificationModal.defaultProps = {
  cancelText: "Close"
};