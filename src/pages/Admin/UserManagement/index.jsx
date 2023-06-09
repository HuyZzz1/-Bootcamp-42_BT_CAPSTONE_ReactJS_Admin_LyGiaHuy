import React, { useEffect, useState, useRef } from "react";
import { Card, Form, Input, Button, Table, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { column } from "./columns";
import { apiGetListUser } from "../../../services/request/api";
import { useDebouncedCallback } from "use-debounce";
import Add from "./Modal/Add";
import Edit from "./Modal/Edit";
import Swal from "sweetalert2";
import { ShowSuccess, ShowError } from "../../../components/Message";
import { apiDeleteUserAdmin } from "../../../services/request/api";
import { Wrapper } from "./styled";

const MoviesManagement = () => {
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(false);
  const addRef = useRef();
  const editRef = useRef();

  const onEdit = (item) => editRef.current.open(item);

  const getListUser = async (value) => {
    if (!value) {
      isLoading(true);
      const data = await apiGetListUser();
      setData(data?.content);
      isLoading(false);
    }

    if (value) {
      isLoading(true);
      const data = await apiGetListUser(value);
      setData(data?.content);
      isLoading(false);
    }
  };

  const onSearch = async (value) => {
    getListUser(value);
  };

  const onChangeKeyWord = useDebouncedCallback((e) => {
    const value = e.target.value;
    onSearch(value);
  }, 1000);

  const onDelete = (account) => {
    Swal.fire({
      icon: "warning",
      text: "Bạn muốn xoá dữ liệu này chứ?",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Không",
      showCancelButton: true,
      confirmButtonColor: "#1677ff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiDeleteUserAdmin(account);
          getListUser();
          ShowSuccess("Xoá thành công");
        } catch (error) {
          ShowError(error?.response?.data?.content);
        }
      }
    });
  };

  useEffect(() => {
    getListUser();
  }, []);

  return (
    <>
      <Add ref={addRef} getListUser={getListUser} />
      <Edit ref={editRef} getListUser={getListUser} />
      <Card style={{ marginTop: 10 }} bodyStyle={{ padding: "10px 25px" }}>
        <h2>Quản lí người dùng</h2>
      </Card>
      <div style={{ padding: 10 }}>
        <Card bodyStyle={{ padding: 15 }}>
          <Wrapper>
            <div style={{ width: "100%" }}>
              <Form layout="inline">
                <Row style={{ width: "100%" }}>
                  <Col xs={24} md={16} lg={10} xxl={6}>
                    <Form.Item className="no-margin">
                      <Input
                        placeholder="Nhập tài khoản hoặc tên người dùng để tìm kiếm"
                        suffix={<SearchOutlined />}
                        allowClear
                        onChange={onChangeKeyWord}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
            <div>
              <Button type="primary" onClick={() => addRef.current.open()}>
                Thêm người dùng
              </Button>
            </div>
          </Wrapper>

          <div>
            <Table
              size="small"
              columns={column(onEdit, onDelete)}
              dataSource={data}
              pagination={{
                pageSize: 15,
                position: ["bottomCenter"],
              }}
              loading={loading}
              scroll={{
                y: (1 - 350 / window.innerHeight) * window.innerHeight,
                x: 1400,
              }}
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default MoviesManagement;
