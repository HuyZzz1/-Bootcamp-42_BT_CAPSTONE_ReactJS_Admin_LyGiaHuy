import { Tag, Tooltip, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const column = (onEdit, onDelete) => [
  {
    key: "name",
    title: "Họ tên",
    dataIndex: "hoTen",
  },
  {
    key: "account",
    title: "Tài khoản",
    dataIndex: "taiKhoan",
  },
  {
    key: "email",
    title: "Email",
    dataIndex: "email",
  },
  {
    key: "soDT",
    title: "Số điện thoại",
    dataIndex: "soDT",
  },
  {
    key: "type",
    title: "Loại người dùng",
    dataIndex: "maLoaiNguoiDung",
    width: 150,
    align: "center",
    render: (value) => {
      return value === "QuanTri" ? (
        <Tag color="green">{value}</Tag>
      ) : (
        <Tag color="blue">{value}</Tag>
      );
    },
  },
  {
    title: "",
    width: 100,
    align: "center",
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
              onClick={() => onEdit(item)}
            >
              <EditOutlined style={{ fontSize: "14px" }} />
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
              onClick={() => onDelete(item?.taiKhoan)}
            >
              <DeleteOutlined style={{ fontSize: "14px", color: "red" }} />
            </Button>
          </Tooltip>
        </Space>
      );
    },
  },
];
