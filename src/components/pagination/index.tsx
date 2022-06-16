import { Pagination, Select } from "antd";

import { listSizePage } from "./constants";
import "./styles.scss";

export interface CommonPaginationProps {
  pageSize: number;
  currentPage: number;
  totalPage?: number;
  totalItem?: number;
}

const { Option } = Select;
export default function CommonPagination({
  pageSize,
  currentPage,
  totalPage = 0,
  totalItem = 0
}: CommonPaginationProps) {
  return (
    <div className="pagination-container">
      <div className="records-page">
        <Select
          className="select-records"
          value={`${pageSize} records/ page`}
          placeholder="records/ page"
        >
          {listSizePage.map((province, keyIndex) => (
            <Option key={`pagination-size-${keyIndex}`}>
              {province} records/ page
            </Option>
          ))}
        </Select>
        <label htmlFor="records" className="label-records">
          <span>{totalItem} records</span>
        </label>
      </div>
      {totalPage > 1 && (
        <div className="page-number-bar">
          <Pagination
            size="default"
            defaultCurrent={currentPage}
            total={totalItem}
            pageSize={pageSize}
            showQuickJumper
            locale={{ jump_to: "Page", page: "" }}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
}
