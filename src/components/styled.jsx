import { Button, Affix } from "antd";
import styled from "styled-components";

export const StyledButtonAntd = styled(Button)`
  border-radius: 20px;
`;

export const Container = styled.div`
  width: 1200px;
  margin: auto;

  @media (max-width: 1250px) {
    width: calc(100% - 40px);
  }
`;

export const StyledAffix = styled(Affix)`
  .ant-layout-sider {
    min-height: 100vh !important;
  }

  .ant-affix {
    z-index: 9999 !important;
  }
`;

export const WrapperLoading = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
`;
