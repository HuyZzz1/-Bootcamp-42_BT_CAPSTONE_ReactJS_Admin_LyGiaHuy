import React, { useState } from "react";
import { Container } from "../../../components/styled";
import { Card, Row, Col, Form, Input, Button } from "antd";
import { Wrapper, ContentLeft, ContentRight, StyledForm } from "./styled";
import { formValidate } from "../../../services/helper";
import { apiSignIn } from "../../../services/request/api";
import { useDispatch } from "react-redux";
import { setAdmin } from "../../../redux/appSlice";
import { ShowSuccess, ShowError } from "../../../components/Message";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

const SignIn = () => {
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      const data = await apiSignIn({
        taiKhoan: values.account,
        matKhau: values.password,
      });

      if (data.content.maLoaiNguoiDung === "QuanTri") {
        Cookie.set("ACCESS_TOKEN_ADMIN", data?.content?.accessToken);
        dispatch(setAdmin(data?.content));
        navigation("/");
        ShowSuccess("Đăng nhập thành công");
        setIsLoading(false);
        form.resetFields();
      } else {
        setIsLoading(false);
        ShowError("Tài khoản không có quyền truy cập");
      }
    } catch (error) {
      setIsLoading(false);
      ShowError(error?.response?.data?.content);
    }
  };

  return (
    <Wrapper>
      <Container>
        <Card bodyStyle={{ padding: 0 }}>
          <Row>
            <Col lg={14} md={0}>
              <ContentLeft>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h1
                    style={{
                      letterSpacing: 30,
                      color: "white",
                      fontSize: "60px",
                    }}
                  >
                    MOVIES
                  </h1>
                </div>
              </ContentLeft>
            </Col>
            <Col lg={10} md={24} style={{ flex: "1" }}>
              <ContentRight>
                <StyledForm layout="vertical" form={form} onFinish={onFinish}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      marginBottom: "16px",
                    }}
                  >
                    <h1 style={{ fontSize: 30 }}>Đăng nhập</h1>
                  </div>
                  <Form.Item
                    name="account"
                    label="Tài khoản"
                    rules={[formValidate.required]}
                  >
                    <Input placeholder="Tài khoản" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[formValidate.required]}
                  >
                    <Input.Password placeholder="Mật khẩu" />
                  </Form.Item>
                  <Form.Item style={{ textAlign: "center", marginTop: 30 }}>
                    <Button
                      htmlType="submit"
                      type="primary"
                      size="large"
                      style={{ width: "100%" }}
                      disabled={isLoading}
                    >
                      <p>Đăng nhập</p>
                    </Button>
                  </Form.Item>
                </StyledForm>
              </ContentRight>
            </Col>
          </Row>
        </Card>
      </Container>
    </Wrapper>
  );
};

export default SignIn;
