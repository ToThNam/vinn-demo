import React, { MouseEvent, useState, useEffect } from "react";
import { Select, Table } from "antd";

import CommonPagination from "components/pagination";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { IProduct } from "types/products/products";
import {
  getAllProduct,
  updateProduct,
  ListProduct
} from "store/product-slice/product.Slice";
import { UpdateProductRequest } from "services/products.service";
import { ConfirmModal } from "components/modal/confirm-modal";
import { options } from "./constants";
import "./styles.scss";

const { Option } = Select;

export interface IProductList {
  selectedRowIDs: React.Key[];
  handleSelectedRowIDs: (value: React.Key[]) => void;
}

export default function ProductList({
  selectedRowIDs,
  handleSelectedRowIDs
}: IProductList) {
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [valueSelectedStatus, setValueSelectedStatus] = useState<string>("");
  const [rowSelected, setRowSelected] = useState<any>({});

  const listProduct: IProduct[] = useAppSelector(ListProduct);

  const handleSelectStatus = (status: string, product: IProduct): void => {
    setIsModalVisible(true);
    setValueSelectedStatus(status);
    setRowSelected(product);
  };

  const handleConfirm = (): void => {
    setIsModalVisible(false);
    const body: UpdateProductRequest = {
      ...rowSelected,
      status: valueSelectedStatus
    };
    if (rowSelected.id) {
      const { id } = rowSelected;
      dispatch(updateProduct({ id, body }));
    }
  };

  const handleCancel = (): void => {
    setIsModalVisible(false);
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  function onSelectChange(value: React.Key[]) {
    handleSelectedRowIDs(value);
  }

  const rowSelection = {
    selectedRowIDs,
    onChange: onSelectChange
  };

  console.log("rowSelection", rowSelection);

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      width: "30%",
      render: (value: string, row: IProduct) => (
        <div className="flex item-center justify-center">
          <img
            src={row.image[0]}
            alt=""
            width={60}
            height={60}
            style={{ borderRadius: "8px", marginRight: "24px" }}
          />
          <span>{row.name}</span>
        </div>
      )
    },
    {
      title: "Variants",
      dataIndex: "variants",
      width: "10%",
      render: (value: string, row: IProduct) => (
        <span className="flex justify-center">{row.variants?.length}</span>
      )
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "15%",
      render: (value: string, row: IProduct) => (
        <span>
          €{row.originalPrice} ~ €{row.discountPrice}
        </span>
      )
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: "10%",
      render: (value: string, row: IProduct) => (
        <span className="flex justify-center">{row.productQuantity}</span>
      )
    },
    {
      title: "Created Date",
      dataIndex: "createdDate"
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "15%",
      render: (value: string, row: IProduct) => (
        <div className="form-select">
          <Select
            value={value}
            onChange={(valueChange: string) =>
              handleSelectStatus(valueChange, row)
            }
            onClick={(e: MouseEvent<HTMLDivElement>) => handleClick(e)}
          >
            {options.map((option, index) => (
              <Option value={option} key={index}>
                <span className={option}>{option}</span>
              </Option>
            ))}
          </Select>
        </div>
      )
    }
  ];

  return (
    <div>
      <div className="product-table-container">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={listProduct}
          pagination={false}
          onRow={(record) => ({})}
          locale={{ emptyText: "No result found" }}
          scroll={{ y: 600, x: "auto" }}
        />
      </div>
      <CommonPagination
        pageSize={12}
        currentPage={50}
        totalPage={2}
        totalItem={33}
      />
      <ConfirmModal
        visible={isModalVisible}
        okText={
          valueSelectedStatus === "Inactive" ? "Inactive" : valueSelectedStatus
        }
        onOk={handleConfirm}
        onCancel={handleCancel}
      >
        Are you sure to {valueSelectedStatus.toLocaleLowerCase()} this product?
      </ConfirmModal>
    </div>
  );
}
