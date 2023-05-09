import React from "react";
import { WrapperLoading } from "./styled";
import RingLoader from "react-spinners/RingLoader";

const Loading = () => {
  return (
    <WrapperLoading>
      <RingLoader size={100} color="#29a7e1" />
    </WrapperLoading>
  );
};

export default Loading;
