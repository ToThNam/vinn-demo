import React, { useState } from "react";
import { Tree } from "antd";

import CommonModal from "components/modal/common-modal";
import { IChipSelected, ICategorySelected } from "types/products/products";
import { SearchIcon, ExpandCategoryIcon, CircleXIcon } from "assets/icons";
import { treeData } from "./constants";
import "./styles.scss";

export interface ISelectCategoryFormProps {
  checkedKeys?:
    | {
        checked: React.Key[];
        halfChecked: React.Key[];
      }
    | React.Key[];
  handleCheckedKeys?: (
    checked:
      | {
          checked: React.Key[];
          halfChecked: React.Key[];
        }
      | React.Key[]
  ) => void;
  chipSelected: IChipSelected[];
  handleChipSelected?: (chip: IChipSelected[]) => void;
  handleCategorySelected?: (value: ICategorySelected[]) => void;
  title: string;
  checkable: boolean;
  selectable: boolean;
  isActive: boolean;
  onCancel: () => void;
  onSave: () => void;
}

export default function SelectCategoryForm({
  title,
  checkable,
  selectable,
  checkedKeys,
  handleCheckedKeys,
  chipSelected,
  handleChipSelected,
  handleCategorySelected,
  isActive,
  onCancel,
  onSave
}: ISelectCategoryFormProps) {
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  const onExpand = (expandedKeysValue: React.Key[]) => {
    setAutoExpandParent(false);
    setExpandedKeys(expandedKeysValue);
  };

  const onSelect = (key: React.Key[], value: any) => {
    const selected: ICategorySelected[] = [];
    selected.push({
      title: value.node.title,
      key: value.node.key
    });
    handleCategorySelected?.(selected);
  };

  const onCheck = (
    checkedKeysValue:
      | {
          checked: React.Key[];
          halfChecked: React.Key[];
        }
      | React.Key[],
    info: any
  ) => {
    handleCheckedKeys?.(checkedKeysValue);

    const resultWithoutChidlren = info.checkedNodes.filter(
      (element: IChipSelected) => !element.children
    );

    const resultTitle = resultWithoutChidlren.map((el: IChipSelected) => ({
      title: el.title,
      key: el.key
    }));

    handleChipSelected?.(resultTitle);
  };

  const onDeleteTitle = (key: React.Key) => {
    const result = chipSelected.filter((el) => el.key !== key);
    const arr: React.Key[] = [];
    result?.forEach((el) => {
      arr.push(el.key);
    });
    handleChipSelected?.(result);
    handleCheckedKeys?.(arr);
  };

  return (
    <div className="modal-container">
      <CommonModal
        width={964}
        visible={isActive}
        onOk={onSave}
        onCancel={onCancel}
        okText={"Save"}
        title={title}
      >
        <div className="tree-select-container">
          <SearchIcon className="search-tree-select" />
          {chipSelected.length > 6 ? (
            <>
              {chipSelected?.slice(0, 6).map((element: IChipSelected) => (
                <div
                  className="tree-select-content-container"
                  key={element.key}
                >
                  <div className="tree-select-content">
                    <span className="ml-05">{element.title}</span>
                    <CircleXIcon
                      className="cursor-pointer "
                      onClick={() => onDeleteTitle(element.key)}
                    />
                  </div>
                </div>
              ))}
              <span className="text-selected text-base">...</span>
            </>
          ) : (
            <div>
              {chipSelected.length <= 6 && chipSelected.length !== 0 ? (
                <div className="flex">
                  {chipSelected?.slice(0, 6).map((element: IChipSelected) => (
                    <div
                      className="tree-select-content-container"
                      key={element.key}
                    >
                      <div className="tree-select-content">
                        <span className="ml-05">{element.title}</span>
                        <CircleXIcon
                          className="cursor-pointer "
                          onClick={() => onDeleteTitle(element.key)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-gray-400 ml-2">Select category</span>
              )}
            </div>
          )}
        </div>
        <Tree
          treeData={treeData}
          onExpand={onExpand}
          onSelect={onSelect}
          checkable={checkable}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          height={350}
          blockNode={true}
          selectable={selectable}
          switcherIcon={<ExpandCategoryIcon />}
        />
      </CommonModal>
    </div>
  );
}
