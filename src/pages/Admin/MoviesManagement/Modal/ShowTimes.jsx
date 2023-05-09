import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
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
  InputNumber,
} from "antd";
import { formValidate } from "../../../../services/helper";
import dayjs from "dayjs";
import {
  apiCreateShowtimes,
  apiGetCinemaClusterInformation,
  apiGetCinemaSystem,
} from "../../../../services/request/api";
import { v4 as uuid } from "uuid";
import { ShowSuccess } from "../../../../components/Message";

const ShowTimes = (_, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item, setItem] = useState();
  const [cinemaSystem, setCinemaSystem] = useState([]);
  const [clusterInformation, setClusterInformation] = useState([]);
  const [form] = Form.useForm();
  const codeCinemaSystem = Form.useWatch("heThongRap", form);

  useImperativeHandle(ref, () => ({
    open: (item) => {
      setItem(item);
      setIsModalOpen(true);
      form.setFieldsValue({
        tenPhim: item?.tenPhim,
      });
    },
  }));

  const getCinemaSystem = async () => {
    const data = await apiGetCinemaSystem();
    setCinemaSystem(data.content);
  };

  const getCinemaClusterInformation = async () => {
    const data = await apiGetCinemaClusterInformation(codeCinemaSystem);
    setClusterInformation(data.content);
  };

  const onFinish = async (values) => {
    await apiCreateShowtimes({
      maPhim: item.maPhim,
      maRap: values.maCumRap,
      giaVe: values.giaVe,
      ngayChieuGioChieu: dayjs(values.ngayGioChieu).format(
        "DD/MM/YYYY hh:mm:ss"
      ),
    });
    ShowSuccess("Tạo lịch chiếu thành công");
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    getCinemaSystem();
  }, []);

  useEffect(() => {
    getCinemaClusterInformation();
  }, [codeCinemaSystem]);

  return (
    <>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        width="40%"
        footer={null}
        destroyOnClose
        title={<h3>Tạo lịch chiếu phim</h3>}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                label="Tên phim"
                rules={[formValidate.required]}
                name="tenPhim"
              >
                <Input placeholder="Nhập tên phim" readOnly />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Hệ thống rạp"
                rules={[formValidate.required]}
                name="heThongRap"
              >
                <Select placeholder="Chọn hệ thống rạp">
                  {cinemaSystem.map((item) => (
                    <Select.Option key={uuid()} value={item?.maHeThongRap}>
                      {item?.tenHeThongRap}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Cụm rạp"
                rules={[formValidate.required]}
                name="maCumRap"
              >
                <Select placeholder="Chọn cụm rạp">
                  {clusterInformation.map((item) => (
                    <Select.Option key={uuid()} value={item?.maCumRap}>
                      {item?.tenCumRap}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Ngày chiếu - Giờ chiếu"
                rules={[formValidate.required]}
                name="ngayGioChieu"
              >
                <DatePicker
                  showTime={{ format: "HH:mm" }}
                  style={{ width: "100%" }}
                  minuteStep={5}
                  format="DD/MM/YYYY HH:mm"
                  placeholder="Chọn ngày chiếu"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Giá vé"
                rules={[
                  formValidate.required,
                  () => ({
                    validator(_, value) {
                      if (75000 <= value && value <= 200000) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Vui lòng nhập giá từ 75.000đ đến 200.000đ")
                      );
                    },
                  }),
                ]}
                name="giaVe"
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Nhập giá vé"
                />
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

export default forwardRef(ShowTimes);
