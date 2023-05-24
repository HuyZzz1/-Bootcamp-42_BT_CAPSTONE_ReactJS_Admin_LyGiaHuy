import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 15px;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;
