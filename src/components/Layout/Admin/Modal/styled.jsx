import styled from "styled-components";
import { Modal } from "antd";

export const StyledModal = styled(Modal)`
  &.ant-modal {
    @media (max-width: 1024px) {
      width: 70% !important;
    }
    @media (max-width: 768px) {
      width: 80% !important;
    }
    @media (max-width: 576px) {
      width: 100% !important;
    }
  }
`;
