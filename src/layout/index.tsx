import { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router";

import { BarIcon } from "assets/icons";
import SideBar from "./sidebar";
import HeaderBreadcrumb from "./header-breadcrumb";
import { breadcrumbAddress } from "./header-breadcrumb/constants";
import "./styles.scss";

const { Header, Content } = Layout;

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const location = useLocation();
  const pathSnippets = location.pathname.replace("/", "").split("/");
  const path = pathSnippets.slice(0, 2);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const showModalChangePassword = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <Layout>
      <SideBar collapsed={collapsed} onShowModal={showModalChangePassword} />
      <Layout>
        <Header>
          <HeaderBreadcrumb />
          <div className="flex item-center mt-1">
            <BarIcon className="cursor-pointer mr-2" onClick={toggle} />
            {path.length === 1 ? (
              <h1 className="text-2xl font-bold mb-0">
                {breadcrumbAddress[`/${path[0]}`]}
              </h1>
            ) : (
              path.length === 2 && (
                <h1 className="text-2xl font-bold mb-0">
                  {breadcrumbAddress[`/${path[1]}`]}
                </h1>
              )
            )}
          </div>
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
