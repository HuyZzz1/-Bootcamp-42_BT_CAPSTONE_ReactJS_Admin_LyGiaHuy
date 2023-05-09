import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Form, Row, Col, Input, Space, Button, Modal } from "antd";
import { apiUpdateUserAdmin } from "../../../../services/request/api";
import { ShowSuccess, ShowError } from "../../../Message";
import { useDispatch } from "react-redux";
import { setAdmin } from "../../../../redux/appSlice";
import { useSelector } from "react-redux";

const Info = (_, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const admin = useSelector((state) => state.app.admin);

  useImperativeHandle(ref, () => ({
    open: async () => {
      form.setFieldsValue({
        hoTen: admin?.hoTen,
        email: admin?.email,
        taiKhoan: admin?.taiKhoan,
        matKhau: admin?.matKhau,
        soDT: admin?.soDT,
      });
      setIsModalOpen(true);
    },
  }));

  const onFinish = async (values) => {
    try {
      const data = await apiUpdateUserAdmin({
        ...values,
        maLoaiNguoiDung: "QuanTri",
      });
      dispatch(setAdmin(data?.content));
      ShowSuccess("Chỉnh sửa thông tin thành công");
    } catch (error) {
      ShowError(error?.response?.data?.content);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      width="40%"
      footer={null}
      destroyOnClose
      title={<h3>Thông tin tài khoản</h3>}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        style={{ width: "100%" }}
      >
        <Row gutter={[12, 12]} style={{ width: "100%" }}>
          <Col sm={24} lg={24}>
            <Form.Item
              label={<p style={{ fontWeight: 500, fontSize: 15 }}>Họ tên</p>}
              name="hoTen"
            >
              <Input placeholder="Họ tên" />
            </Form.Item>
          </Col>
          <Col sm={24} lg={24}>
            <Form.Item
              label={<p style={{ fontWeight: 500, fontSize: 15 }}>Email</p>}
              name="email"
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
          <Col sm={24} lg={24}>
            <Form.Item
              label={
                <p style={{ fontWeight: 500, fontSize: 15 }}>Số điên thoại</p>
              }
              name="soDT"
            >
              <Input placeholder="Số điện thoại" />
            </Form.Item>
          </Col>
          <Col sm={24} lg={24}>
            <Form.Item
              label={<p style={{ fontWeight: 500, fontSize: 15 }}>Tài khoản</p>}
              name="taiKhoan"
            >
              <Input placeholder="Tài khoản" />
            </Form.Item>
          </Col>
          <Col sm={24} lg={24}>
            <Form.Item
              label={<p style={{ fontWeight: 500, fontSize: 15 }}>Mật khẩu</p>}
              name="matKhau"
            >
              <Input.Password placeholder="Mật khẩu" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Space style={{ width: "100%", justifyContent: "center" }}>
              <Button
                htmlType="submit"
                size="large"
                type="primary"
                style={{ width: "100px" }}
              >
                Lưu
              </Button>
              <Button
                size="large"
                type="primary"
                style={{ width: "100px" }}
                onClick={handleCancel}
              >
                Đóng
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default forwardRef(Info);
