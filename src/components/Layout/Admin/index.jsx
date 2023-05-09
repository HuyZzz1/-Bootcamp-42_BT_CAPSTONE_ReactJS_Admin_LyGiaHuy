import { Layout, Menu, Avatar, Affix, Dropdown } from "antd";
import { useEffect, useState, useRef } from "react";
import {
  UserAddOutlined,
  VideoCameraAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { StyledAffix } from "../../styled";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin } from "../../../redux/appSlice";
import { ShowSuccess } from "../../Message";
import { apiGetAdmin } from "../../../services/request/api";
import Info from "./Modal/Info";
import Cookie from "js-cookie";
import Loading from "../../Loading";

const { Header, Content, Sider } = Layout;

const Admin = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(location.pathname);
  const [activeKey, setActiveKey] = useState(location.pathname);
  const admin = useSelector((state) => state.app.admin);
  const infoRef = useRef();
  const loadingInfo = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogOut = () => {
    navigation("/admin/sign-in");
    Cookie.remove("ACCESS_TOKEN_ADMIN");
    dispatch(setAdmin({}));
    ShowSuccess("Đăng xuất thành công");
  };

  const getUser = async () => {
    if (loadingInfo.current) return;
    loadingInfo.current = true;
    try {
      const data = await apiGetAdmin();
      dispatch(setAdmin(data?.content));
      loadingInfo.current = false;
      setIsLoading(false);
    } catch (err) {
      navigation("/admin/sign-in");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Info ref={infoRef} />
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <StyledAffix offsetTop={0}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            collapsedWidth={70}
          >
            <div
              style={{
                height: 32,
                margin: 16,
                background: "rgba(255, 255, 255, 0.2)",
              }}
            />
            <Menu
              theme="dark"
              selectedKeys={[activeKey]}
              onClick={(item) => {
                navigation(item.key);
                setActiveKey(item.key);
              }}
              mode="inline"
              items={[
                {
                  key: "/",
                  icon: <UserAddOutlined style={{ fontSize: 20 }} />,
                  label: "Quản lí người dùng",
                },
                {
                  key: "/admin/movies-management",
                  icon: <VideoCameraAddOutlined style={{ fontSize: 20 }} />,
                  label: "Quản lí phim",
                },
              ]}
            />
          </Sider>
        </StyledAffix>
        <Layout className="site-layout">
          <Affix offsetTop={0}>
            <Header
              style={{
                padding: "0 15px",
                background:
                  "linear-gradient(-225deg, #5d9fff 0%, #b8dcff 48%, #6bbbff 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 1,
                      label: (
                        <p onClick={() => infoRef.current.open()}>
                          Thông tin tài khoản
                        </p>
                      ),
                    },
                    {
                      key: 2,
                      label: (
                        <p style={{ color: "red" }} onClick={handleLogOut}>
                          Đăng xuất
                        </p>
                      ),
                    },
                  ],
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    cursor: "pointer",
                  }}
                >
                  <Avatar size={45} icon={<UserOutlined />} />
                  <p style={{ fontWeight: 500, color: "white" }}>
                    {admin?.hoTen}
                  </p>
                </div>
              </Dropdown>
            </Header>
          </Affix>
          <Content
            style={{
              background: "#f9f9f9",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default Admin;
