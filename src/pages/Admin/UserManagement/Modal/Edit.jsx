import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Form, Input, Row, Col, Select, Space, Button } from "antd";
import { formValidate } from "../../../../services/helper";
import { apiUpdateUserAdmin } from "../../../../services/request/api";
import { ShowSuccess, ShowError } from "../../../../components/Message";
import { StyledModal } from "./styled";

const Edit = ({ getListUser }, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    open: (item) => {
      console.log(item);
      setIsModalOpen(true);
      form.setFieldsValue(item);
    },
  }));

  const onFinish = async (values) => {
    try {
      await apiUpdateUserAdmin(values);
      ShowSuccess("Chỉnh sửa thông tin thành công");
      getListUser();
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      ShowError(error?.response?.data?.content);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <StyledModal
        open={isModalOpen}
        onCancel={handleCancel}
        width="40%"
        footer={null}
        destroyOnClose
        title={<h3>Chỉnh sửa thông tin</h3>}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                label="Loại người dùng"
                name="maLoaiNguoiDung"
                rules={[formValidate.required]}
              >
                <Select>
                  <Select.Option value="KhachHang">Khách hàng</Select.Option>
                  <Select.Option value="QuanTri">Quản trị</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Họ tên"
                rules={[formValidate.required]}
                name="hoTen"
              >
                <Input placeholder="Nhập họ tên" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Tài khoản"
                rules={[formValidate.required]}
                name="taiKhoan"
              >
                <Input placeholder="Nhập tài khoản" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Mật khẩu"
                rules={[formValidate.required]}
                name="matKhau"
              >
                <Input.Password placeholder="Nhập mật khẩu" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Email"
                rules={[formValidate.required, formValidate.email]}
                name="email"
              >
                <Input placeholder="Nhập email" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Số điện thoại" name="soDT">
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>

            <Col span={24} style={{ textAlign: "center" }}>
              <Space>
                <Button type="primary" htmlType="submit" style={{ width: 100 }}>
                  Lưu
                </Button>
                <Button onClick={handleCancel} style={{ width: 100 }}>
                  {" "}
                  Đóng
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </StyledModal>
    </>
  );
};

export default forwardRef(Edit);
