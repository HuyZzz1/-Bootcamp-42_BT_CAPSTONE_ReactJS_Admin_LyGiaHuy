import { Image, Tag, Tooltip, Button, Space } from "antd";
import {
  EditOutlined,
  CalendarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export const column = (onEditMovie, onDelete, onShowTimes) => [
  {
    key: "code",
    title: "Mã phim",
    dataIndex: "maPhim",
    width: 100,
    align: "center",
  },
  {
    key: "image",
    title: "Hình ảnh",
    dataIndex: "hinhAnh",
    width: 100,
    align: "center",
    render: (value) => (
      <Image
        width={60}
        height={50}
        src={value}
        style={{ objectFit: "cover" }}
      />
    ),
  },
  {
    key: "name",
    title: "Tên phim",
    dataIndex: "tenPhim",
    width: 350,
  },
  {
    key: "description",
    title: "Mô tả",
    dataIndex: "moTa",
    render: (value) => <div style={{ whiteSpace: "pre-line" }}>{value}</div>,
  },
  {
    key: "status",
    title: "Trạng thái",
    width: 150,
    align: "center",
    render: (item) => {
      return (
        <>
          {item?.dangChieu && <Tag color="green">Đang chiếu</Tag>}
          {item?.sapChieu && <Tag color="red">Sắp chiếu</Tag>}
        </>
      );
    },
  },
  {
    title: "",
    width: 120,
    render: (item) => {
      return (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button
              size="small"
              type="primary"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => onEditMovie(item)}
            >
              <EditOutlined style={{ fontSize: "14px" }} />
            </Button>
          </Tooltip>
          <Tooltip title="Tạo lịch chiếu">
            <Button
              size="small"
              type="primary"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => onShowTimes(item)}
            >
              <CalendarOutlined style={{ fontSize: "14px" }} />
            </Button>
          </Tooltip>
          <Tooltip title="Xoá">
            <Button
              size="small"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => onDelete(item?.maPhim)}
            >
              <DeleteOutlined style={{ fontSize: "14px", color: "red" }} />
            </Button>
          </Tooltip>
        </Space>
      );
    },
  },
];
