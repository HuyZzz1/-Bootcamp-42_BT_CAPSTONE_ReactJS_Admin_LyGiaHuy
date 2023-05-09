import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  Modal,
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  Select,
  Space,
  Button,
} from "antd";
import UploadComponent from "../../../../components/Upload";
import { formValidate } from "../../../../services/helper";
import { apiAddMovie } from "../../../../services/request/api";
import dayjs from "dayjs";
import { ShowSuccess } from "../../../../components/Message";

const AddMovie = ({ getMovies }, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsModalOpen(true);
      form.setFieldsValue({
        trangThai: "dangChieu",
      });
    },
  }));

  const onFinish = async (values) => {
    const formData = new FormData();

    formData.append("tenPhim", values.tenPhim);
    formData.append("trailer", values.trailer);
    formData.append(
      "ngayKhoiChieu",
      dayjs(values.ngayKhoiChieu).format("DD-MM-YYYY")
    );
    formData.append("hinhAnh", values.hinhAnh);
    formData.append("moTa", values.moTa);
    formData.append("maNhom", "GP11");

    if (values.trangThai === "dangChieu") {
      formData.append("dangChieu", true);
      formData.append("sapChieu", false);
    }

    if (values.trangThai === "sapChieu") {
      formData.append("dangChieu", false);
      formData.append("sapChieu", true);
    }
    await apiAddMovie(formData);
    getMovies();
    ShowSuccess("Thêm phim thành công");
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        width="40%"
        footer={null}
        destroyOnClose
        title={<h3>Thêm phim</h3>}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                label="Tên phim"
                rules={[formValidate.required]}
                name="tenPhim"
              >
                <Input placeholder="Nhập tên phim" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Trailer"
                rules={[formValidate.required]}
                name="trailer"
              >
                <Input placeholder="Nhập link trailer phim" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Ngày chiếu"
                rules={[formValidate.required]}
                name="ngayKhoiChieu"
              >
                <DatePicker
                  style={{ width: "100%" }}
                  format="DD-MM-YYYY"
                  placeholder="Chọn ngày chiếu"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Trạng thái"
                name="trangThai"
                rules={[formValidate.required]}
              >
                <Select>
                  <Select.Option value="dangChieu">Đang chiếu</Select.Option>
                  <Select.Option value="sapChieu">Sắp chiếu</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Hình ảnh"
                name="hinhAnh"
                rules={[formValidate.required]}
              >
                <UploadComponent
                  onFileChange={(file) => form.setFieldValue("hinhAnh", file)}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Mô tả"
                rules={[formValidate.required]}
                name="moTa"
              >
                <Input.TextArea rows={5} placeholder="Nhập mô tả" />
              </Form.Item>
            </Col>
            <Col span={24} style={{ textAlign: "center" }}>
              <Space>
                <Button type="primary" htmlType="submit" style={{ width: 100 }}>
                  Thêm
                </Button>
                <Button onClick={handleCancel} style={{ width: 100 }}>
                  {" "}
                  Đóng
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default forwardRef(AddMovie);
