import { Modal, ModalProps } from "antd";

import "./styles.scss";

export interface CommonModalProps extends ModalProps {
  children?: string | React.ReactNode;
  title?: string | React.ReactNode
}

function CommonModal({ children, title, ...props }: CommonModalProps) {
  return (
    <Modal title={title} width={400} centered className="common-modal-wrapper" {...props} >
      {children}
    </Modal>
  );
}
export default CommonModal;