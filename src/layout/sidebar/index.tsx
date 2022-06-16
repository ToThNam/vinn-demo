import { Avatar, Divider, Dropdown, Layout, Menu, Space } from "antd";
import { NavLink, Link } from "react-router-dom";

import { ArrowRightIcon, Logo, UserIcon, ViniviaIcon } from "assets/icons";
import { MenuSidebar } from "routes/menu.const";
import { Icon, MenuItem } from "types/layout-menu/menu";
import "./styles.scss";

export interface IsideBar {
  collapsed: boolean;
  onShowModal: () => void;
}

const { Sider: SidebarLayout } = Layout;

const MenuUnCollapsed = () => (
  <Menu mode="inline" className=" text-base">
    {MenuSidebar.map((element: MenuItem) => {
      const MenuIcon = element.icon as Icon;
      return (
        <Menu.Item key={element.id} icon={<MenuIcon />} className="menu-item">
          <Link to={element.path}>{element.name}</Link>
          {element.name !== "Video" && <ArrowRightIcon />}
        </Menu.Item>
      );
    })}
  </Menu>
);

const MenuCollapsed = () => (
  <Menu mode="inline" className=" text-base">
    {MenuSidebar.map((element) => {
      const MenuIcon = element.icon as Icon;
      return (
        <NavLink
          to={element.path}
          key={element.id}
          className="menu-collapsed flex justify-center"
        >
          <MenuIcon />
        </NavLink>
      );
    })}
  </Menu>
);

export default function SideBar({ collapsed, onShowModal }: IsideBar) {
  const profileMenu = (
    <Menu className="radius-normal">
      <Menu.Item className="font-medium">My Profile</Menu.Item>
      <Menu.Item className="font-medium" onClick={onShowModal}>
        Change Password
      </Menu.Item>
      <Divider className="divider" />
      <Menu.Item className="text-red font-medium">Sign Out</Menu.Item>
    </Menu>
  );
  return (
    <SidebarLayout
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="sidebar-container"
      width={264}
      collapsedWidth={100}
    >
      <div className="flex flex-column full-height">
        <div className="logo-vinvia">
          {collapsed ? <ViniviaIcon /> : <Logo />}
        </div>
        <div className="flex flex-column justify-between full-height">
          {collapsed ? <MenuCollapsed /> : <MenuUnCollapsed />}
          {collapsed ? (
            <div className="collapsed-avt">
              <Avatar size="large" icon={<UserIcon />} />
            </div>
          ) : (
            <Space direction="vertical">
              <Dropdown
                overlay={profileMenu}
                placement="topRight"
                trigger={["click"]}
              >
                <div className="menu-profile-button flex item-center cursor-pointer">
                  <Avatar size="large" icon={<UserIcon />} />
                  <div className="ml-1">
                    <div className="flex">
                      <div className="mr-4 ">James Potter</div>
                      <ArrowRightIcon />
                    </div>
                    <div className="text-gray-400 ">Admin</div>
                  </div>
                </div>
              </Dropdown>
            </Space>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}
