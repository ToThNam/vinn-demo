import React, { useState, useEffect, useRef, useContext } from "react";
import { Form, Row, Input, FormInstance } from "antd";
import { DefaultRecordType, TableComponents } from "rc-table/lib/interface";

import CommonTable from "components/table";
import { IVariant } from "types/products/products";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { listVariant, variantActions } from "store/product-slice/variant.Slice";
import { regSku, regPrice, regNu } from "./constants";

import "./styles.scss";

const EditableContext = React.createContext<FormInstance<any> | null>(null);

export interface IVariantsProps {
  validateVariant: boolean;
  handleValidateVariant: (value: boolean) => void;
}

export interface IEditableRowProps {
  index: number;
}

export interface IEditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof IVariant;
  record: IVariant;
  handleSave: (record: IVariant) => void;
}

const EditableRow = ({ index, ...props }: IEditableRowProps) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}: IEditableCellProps) => {
  const [editing, setEditing] = useState<boolean>(false);
  const inputRef = useRef<Input>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex]
    });
  };

  const save = async () => {
    setEditing(false);
    try {
      const values = await form.validateFields();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  function getRules() {
    if (dataIndex === "originPrice" || dataIndex === "quantity") {
      return [{ required: true, message: "" }];
    }
  }
  const _rules = getRules();

  if (editable) {
    childNode = editing ? (
      <Form.Item name={dataIndex} rules={_rules} style={{ margin: 0 }}>
        <Input
          className="input-table-cell"
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
        />
      </Form.Item>
    ) : (
      <div onClick={toggleEdit}>{children}</div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default function Variant({
  validateVariant,
  handleValidateVariant
}: IVariantsProps) {
  const dispatch = useAppDispatch();
  const variant: IVariant[] = useAppSelector(listVariant);

  useEffect(() => {
    variant.forEach((el) => {
      if (
        el.originPrice === "" ||
        el.originPrice === 0 ||
        el.quantity === "" ||
        el.quantity === 0
      ) {
        handleValidateVariant(true);
      } else {
        handleValidateVariant(false);
      }
    });
  }, [handleValidateVariant, variant]);

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      width: "10%",
      render: (value: string, row: IVariant, index: number) =>
        index < 9 ? `0${index + 1}` : `${index + 1}`
    },
    {
      title: "Variant Name",
      dataIndex: "variantName",
      width: "30%"
    },
    {
      title: "SKU",
      dataIndex: "sku",
      width: "5%",
      editable: true,
      render: (value: string, row: IVariant) => (
        <div>
          {row.sku === "" ? (
            <div className="table-cell" />
          ) : (
            <div className="table-cell">
              {row.sku !== "0" && <span>#{row.sku}</span>}
            </div>
          )}
        </div>
      )
    },
    {
      title: "Price*",
      dataIndex: "originPrice",
      width: "10%",
      editable: true,
      render: (value: string, row: IVariant) => (
        <div>
          {row.originPrice === "" ? (
            <div className="table-error-cell" />
          ) : (
            <div className="table-cell">
              {row.originPrice !== 0 && <span>€{row.originPrice}</span>}
            </div>
          )}
        </div>
      )
    },
    {
      title: "Discount Price",
      dataIndex: "discountPrice",
      width: "17%",
      editable: true,
      render: (value: string, row: IVariant) => (
        <div>
          {row.discountPrice === "" ? (
            <div className="table-cell" />
          ) : (
            <div className="table-cell">
              {row.discountPrice !== 0 && <span>€{row.discountPrice}</span>}
            </div>
          )}
        </div>
      )
    },
    {
      title: "Quantity*",
      dataIndex: "quantity",
      width: "15%",
      editable: true,
      render: (value: string, row: IVariant) => (
        <div>
          {row.quantity === "" ? (
            <div className="table-error-cell" />
          ) : (
            <div className="table-cell">
              {row.quantity !== 0 && <span>{row.quantity}</span>}
            </div>
          )}
        </div>
      )
    }
  ];

  function handleSave(row: IVariant) {
    const isSKU = regSku.test(row.sku);
    const isVariantActionsNumber = regPrice.test(row.originPrice as string);
    const isDiscountActionsNumber = regPrice.test(row.discountPrice as string);
    const isQuantity = regNu.test(row.quantity as string);

    if (
      isSKU &&
      isVariantActionsNumber &&
      isQuantity &&
      isDiscountActionsNumber
    ) {
      dispatch(variantActions.updateVariant(row));
    }
  }

  const components: TableComponents<DefaultRecordType> = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  };

  const _columns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: IVariant) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave
      })
    };
  });

  return (
    <Form layout="vertical">
      <div className="variant-content">
        <h1 className="text-lg mb-2">Variant</h1>
        <Row>
          <Form.Item>
            <CommonTable
              components={components}
              rowClassName={() => "editable-row"}
              data={variant}
              columns={_columns}
            />
          </Form.Item>
        </Row>
      </div>
    </Form>
  );
}
