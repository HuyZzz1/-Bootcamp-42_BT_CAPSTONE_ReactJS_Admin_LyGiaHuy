import React, { useEffect, useState, useRef } from "react";
import { Card, Form, Input, Button, Table, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { column } from "./columns";
import { apiDeleteMovie, apiGetMovies } from "../../../services/request/api";
import AddMovie from "./Modal/AddMovie";
import EditMovie from "./Modal/EditMovie";
import { ShowSuccess } from "../../../components/Message";
import Swal from "sweetalert2";
import ShowTimes from "./Modal/ShowTimes";
import { useDebouncedCallback } from "use-debounce";
import { Wrapper } from "./styled";

const MoviesManagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const addMovieRef = useRef();
  const editMovieRef = useRef();
  const showTimesRef = useRef();

  const onAddMovie = () => addMovieRef.current.open();
  const onEditMovie = (item) => editMovieRef.current.open(item);
  const onShowTimes = (item) => showTimesRef.current.open(item);

  const getMovies = async () => {
    setLoading(true);
    const data = await apiGetMovies();
    setData(data.content);
    setLoading(false);
  };

  const onSearch = async (value) => {
    if (value) {
      const newData = data.filter(
        (item) => item.tenPhim.toUpperCase().indexOf(value.toUpperCase()) !== -1
      );
      setData(newData);
    }

    if (!value) {
      getMovies();
    }
  };

  const onChangeKeyWord = useDebouncedCallback((e) => {
    const value = e.target.value;
    onSearch(value);
  }, 1000);

  const onDelete = (id) => {
    Swal.fire({
      icon: "warning",
      text: "Bạn muốn xoá dữ liệu này chứ?",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Không",
      showCancelButton: true,
      confirmButtonColor: "#1677ff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await apiDeleteMovie(id);
        getMovies();
        ShowSuccess("Xoá thành công");
      }
    });
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <AddMovie ref={addMovieRef} getMovies={getMovies} />
      <EditMovie ref={editMovieRef} getMovies={getMovies} />
      <ShowTimes ref={showTimesRef} />
      <Card style={{ marginTop: 10 }} bodyStyle={{ padding: "10px 25px" }}>
        <h2>Quản lí phim</h2>
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
                        placeholder="Nhập tên phim để tìm kiếm"
                        suffix={<SearchOutlined />}
                        onChange={onChangeKeyWord}
                        allowClear
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
            <div>
              <Button type="primary" onClick={() => onAddMovie()}>
                Thêm phim
              </Button>
            </div>
          </Wrapper>

          <div>
            <Table
              size="small"
              columns={column(onEditMovie, onDelete, onShowTimes)}
              dataSource={data}
              loading={loading}
              pagination={{
                pageSize: 15,
                position: ["bottomCenter"],
              }}
              scroll={{
                y: (1 - 340 / window.innerHeight) * window.innerHeight,
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
