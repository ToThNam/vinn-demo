import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AddIcon, BinIcon } from "assets/icons";
import { CommonButton } from "components/button";
import { ConfirmModal } from "components/modal/confirm-modal";
import { productDetail } from "routes/routes.paths";
import { useAppDispatch } from "store/hooks";
import { deleteProductThenGetAllProduct } from "store/product-slice/product.Slice";
import SearchProduct from "./search-product";
import SortButtonProduct from "./sort-product";
import FilterButtonProduct from "./filter-product";
import "./styles.scss";

export interface IProductList {
  selectedRowIDs: React.Key[];
  handleSelectedRowIDs: (value: React.Key[]) => void;
}

export interface IValueDelete {
  id: string[];
}

export default function ProductSearchSortFilter({
  selectedRowIDs,
  handleSelectedRowIDs
}: IProductList) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleDelete = () => {
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    const value: string[] = selectedRowIDs.map((el) => el.toString());
    dispatch(deleteProductThenGetAllProduct(value));
    setIsModalVisible(false);
    handleSelectedRowIDs([]);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="search-sort-filter-container">
      <SearchProduct />
      {selectedRowIDs.length ? (
        <div>
          <CommonButton
            block={true}
            space="space-medium"
            className="delete-button-container"
            icon={<BinIcon />}
            onClick={handleDelete}
          >
            <span className="ml-1">Delete ({selectedRowIDs.length})</span>
          </CommonButton>
        </div>
      ) : (
        <div className="flex justify-between group-button">
          <SortButtonProduct />
          <FilterButtonProduct />
          <CommonButton
            block={true}
            space="space-medium"
            className="filter-button-container"
            icon={<AddIcon />}
            onClick={() => navigate(productDetail.PATH_PRODUCT_DETAIL)}
          >
            <span className="ml-2">Add product</span>
          </CommonButton>
        </div>
      )}
      <ConfirmModal
        visible={isModalVisible}
        okText={"Delete"}
        onOk={handleConfirmDelete}
        onCancel={handleCancel}
      >
        Are you sure to delete this product?
      </ConfirmModal>
    </div>
  );
}
