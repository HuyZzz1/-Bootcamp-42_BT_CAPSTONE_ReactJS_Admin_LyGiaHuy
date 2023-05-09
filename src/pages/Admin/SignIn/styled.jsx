import { Form } from "antd";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f2f5;
`;

export const ContentLeft = styled.div`
  height: 700px;
  width: 100%;
  border-radius: 1rem 0 0 1rem;
  background: linear-gradient(-225deg, #5d9fff 0%, #b8dcff 48%, #6bbbff 100%);
`;
export const ContentRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 35px;
  min-height: 700px;

  .ant-form {
    width: 100%;
  }
`;

export const StyledForm = styled(Form)`
  .ant-form-item-row {
    margin-bottom: 15px;
  }
  .ant-form-item-label {
    .ant-form-item-required {
      font-weight: 500;
    }
  }
  .ant-input,
  .ant-input-affix-wrapper {
    padding: 10px 15px;
    color: #43476b;
  }

  .ant-btn-primary {
    &:hover {
      background-color: #2472c7;
    }
  }
`;
