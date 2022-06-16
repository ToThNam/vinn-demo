import { useState, useMemo } from "react";
import { Menu, Dropdown } from "antd";

import { FilterIcon, EuroIcon, ArrowRightIcon } from "assets/icons";
import { IChipSelected } from "types/products/products";
import { CommonButton } from "components/button";
import TextInput from "components/form-control/text-input";
import SelectCategoryForm from "modules/product/select-category-form";
import "./styles.scss";

export default function FilterButtonProduct() {
  const [isModalVisible, setIsModaVisible] = useState<boolean>(false);
  const [chipSelected, setChipSelected] = useState<IChipSelected[]>([]);
  const [chipTitle, setChipTitle] = useState<string[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<
    | {
        checked: React.Key[];
        halfChecked: React.Key[];
      }
    | React.Key[]
  >([]);

  const handleShowModal = () => {
    setIsModaVisible(!isModalVisible);
  };

  const handleCancel = () => {
    setIsModaVisible(false);
    setCheckedKeys([]);
    setChipSelected([]);
  };

  const handleSave = () => {
    setIsModaVisible(false);
  };

  const handleCheckedKeys = (
    checkedKeysValue:
      | {
          checked: React.Key[];
          halfChecked: React.Key[];
        }
      | React.Key[]
  ) => {
    setCheckedKeys(checkedKeysValue);
  };

  const handleChipSelected = (chip: IChipSelected[]) => {
    setChipSelected(chip);
    const values: string[] = [];
    chip.forEach((el, index) => {
      if (index < 3) {
        values.push(el.title);
      }
    });
    setChipTitle(values);
  };

  const category = useMemo(() => {
    if (!chipSelected.length) {
      return "Select category";
    }
    const title = chipTitle.join(", ");
    if (chipSelected.length > 3) {
      return `${title}, ...`;
    }
    return title;
  }, [chipTitle, chipSelected]);

  const FilterDropDown = (
    <Menu className="sort-menu">
      <p className="text-gray-400 ">PRINCE RANGE</p>
      <div className="range-input">
        <div className="filter-input">
          <TextInput prefix={<EuroIcon />} placeholder={"Min"} />
        </div>
        <div className="filter-input">
          <TextInput prefix={<EuroIcon />} placeholder={"Max"} />
        </div>
      </div>
      <p className="text-gray-400 ">CATEGORY</p>
      <Menu.Item>
        <div className="select-tree-button " onClick={handleShowModal}>
          <div className="text-gray-700 ml-2">
            {!chipSelected.length ? (
              <span className="text-gray-400 ">{category}</span>
            ) : (
              <span className="text-gray-700 ">{category}</span>
            )}
          </div>
          <ArrowRightIcon />
        </div>
      </Menu.Item>
      <div className="flex justify-between ">
        <div />
        <div className="filter-option-button">
          <CommonButton block={true} space="space-small" className="mr-1">
            Apply
          </CommonButton>
          <CommonButton block={true} variant="dashed" space="space-small">
            Reset
          </CommonButton>
        </div>
      </div>
    </Menu>
  );
  return (
    <>
      <Dropdown placement="bottomLeft" overlay={FilterDropDown}>
        <CommonButton
          block={true}
          variant="dashed"
          space="space-medium"
          className="filter-button-container"
          icon={<FilterIcon />}
        >
          <span className="ml-2">Filter</span>
        </CommonButton>
      </Dropdown>
      <SelectCategoryForm
        title="Filter Category"
        checkedKeys={checkedKeys}
        handleCheckedKeys={handleCheckedKeys}
        chipSelected={chipSelected}
        handleChipSelected={handleChipSelected}
        checkable={true}
        selectable={false}
        isActive={isModalVisible}
        onCancel={handleCancel}
        onSave={handleSave}
      />
    </>
  );
}
