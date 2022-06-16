import { Menu, Dropdown } from "antd";

import { ArrowDownSortIcon } from "assets/icons";
import { CommonButton } from "components/button";
import "./styles.scss";

const SortDropDown = () => (
  <Menu className="sort-menu">
    <Menu.Item className="sort-item text-selected">
      Price (high to low)
    </Menu.Item>
    <Menu.Item className="sort-item">Price (low to high)</Menu.Item>
    <CommonButton block={true} variant="dashed" space="space-medium">
      Reset
    </CommonButton>
  </Menu>
);

export default function SortButtonProduct() {
  return (
    <Dropdown placement="bottomLeft" overlay={SortDropDown}>
      <CommonButton
        block={true}
        reverseIcon={true}
        variant="dashed"
        space="space-medium"
        className="sort-button-container"
        icon={<ArrowDownSortIcon />}
      >
        <span className="mr-2">Sort by</span>
      </CommonButton>
    </Dropdown>
  );
}
