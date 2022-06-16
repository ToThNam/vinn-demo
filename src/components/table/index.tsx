import {
  GetComponentProps,
  DefaultRecordType,
  TableComponents
} from "rc-table/lib/interface";
import { Table } from "antd";

import "./styles.scss";

export interface CommonTableProps {
  columns: any;
  data?: object[];
  loading?: boolean;
  components: TableComponents<DefaultRecordType>;
  rowClassName: () => string;
  onRow?: GetComponentProps<DefaultRecordType>;
}
export default function CommonTable({
  columns,
  data,
  loading,
  onRow,
  components,
  rowClassName
}: CommonTableProps) {
  return (
    <div className="table-container">
      <Table
        components={components}
        rowClassName={rowClassName}
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
        onRow={onRow}
        locale={{ emptyText: "No result found" }}
        scroll={{ y: 600, x: "auto" }}
      />
    </div>
  );
}
