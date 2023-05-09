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
import { apiUpdateMovie } from "../../../../services/request/api";
import dayjs from "dayjs";
import { ShowSuccess } from "../../../../components/Message";

const EditMovie = ({ getMovies }, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [item, setItem] = useState();

  useImperativeHandle(ref, () => ({
    open: (item) => {
      console.log(item);
      setItem(item);
      setIsModalOpen(true);
      const status = () => {
        if (item?.dangChieu) {
          return "dangChieu";
        } else {
          return "sapChieu";
        }
      };
      form.setFieldsValue({
        trangThai: status(),
        tenPhim: item.tenPhim,
        trailer: item.trailer,
        ngayKhoiChieu: dayjs(item.ngayKhoiChieu),
        moTa: item.moTa,
        hinhAnh: item.hinhAnh,
      });
    },
  }));

  const onFinish = async (values) => {
    console.log(values);
    const formData = new FormData();

    if (values?.hinhAnh) formData.append("hinhAnh", values.hinhAnh);

    formData.append("tenPhim", values.tenPhim);
    formData.append("trailer", values.trailer);
    formData.append(
      "ngayKhoiChieu",
      dayjs(values.ngayKhoiChieu).format("DD-MM-YYYY")
    );
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
    await apiUpdateMovie(formData);
    getMovies();
    ShowSuccess("Chỉnh sửa thông tin phim thành công");
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
        title={<h3>Chỉnh sửa thông tin phim</h3>}
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
              <Form.Item label="Hình ảnh" name="hinhAnh">
                <UploadComponent
                  defaultValue={item?.hinhAnh}
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
      </Modal>
    </>
  );
};

export default forwardRef(EditMovie);
