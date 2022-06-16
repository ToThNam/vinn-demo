import { useState, useEffect, MouseEvent } from "react";
import { Form, Row, Input, Button } from "antd";
import { v4 as uuidv4 } from "uuid";

import CommonSelect from "components/select";
import { ConfirmModal } from "components/modal/confirm-modal";
import { CommonButton } from "components/button";
import { useAppDispatch } from "store/hooks";
import { variantActions } from "store/product-slice/variant.Slice";
import { IAttribute } from "types/products/products";
import { TrashAltIcon, AddIcon, CircleXIcon } from "assets/icons";
import { options } from "./constants";
import "./styles.scss";

export interface IAttributeProps {
  valueAttribute: IAttribute[];
  handleValueAttribute: (value: IAttribute[]) => void;
  validateAttribute: boolean;
  handleValidateAttribute: (value: boolean) => void;
}

export interface IObjectAttribute {
  [key: string]: IAttribute;
}

export default function Attribute({
  valueAttribute,
  handleValueAttribute,
  validateAttribute,
  handleValidateAttribute
}: IAttributeProps) {
  const dispatch = useAppDispatch();

  const [isIdTag, setIsIdtag] = useState<string>("");
  const [newtag, setNewTag] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (valueAttribute.length === 0) {
      dispatch(variantActions.deleteAllVariant());
    }
    valueAttribute.forEach((el) => {
      if (el.name !== "" && el.options.length > 0) {
        handleValidateAttribute(false);
      }
      if (el.name === "") {
        handleValidateAttribute(true);
      }
      if (el.options.length === 0) {
        handleValidateAttribute(true);
      }
    });
  }, [valueAttribute]);

  const errValidateAttribute = (value: IAttribute) => {
    if (value.name !== "" && value.options.length > 0) {
      return "";
    }
    if (value.name === "" && value.options.length === 0) {
      return "Attribute is required";
    }
    if (value.name === "") {
      return "Name is required";
    }
    if (value.options.length === 0) {
      return "Options is required";
    }
  };

  const handleAddAttribute = () => {
    const result: IAttribute[] = [...valueAttribute];
    result.push({
      id: uuidv4(),
      name: "",
      options: []
    });
    handleValueAttribute(result);
  };

  const handleSelectStatus = (value: IAttribute, status: string) => {
    const result: IAttribute[] = valueAttribute.filter((el) => {
      if (el.id === value.id && status) {
        return (el.name = status);
      }
      return el;
    });
    handleValueAttribute(result);
  };

  const handleSaveTag = (value: string) => {
    const result: IAttribute[] = valueAttribute.filter((el) => {
      if (el.id === value && newtag) {
        return el.options.push({
          id: uuidv4(),
          name: newtag
        });
      }
      return el;
    });
    handleValueAttribute(result);
    setIsIdtag("");
    setNewTag("");
  };

  const handleDeleteTag = (idAttibute: string, idTag: string) => {
    const result: IAttribute[] = valueAttribute.filter((el) => {
      if (el.id === idAttibute) {
        return (el.options = el.options.filter((ele) => ele.id !== idTag));
      }
      return el;
    });
    handleValueAttribute(result);
  };

  const handleDeleteAttribute = (value: string) => {
    if (valueAttribute.length > 1) {
      return handleValueAttribute(
        valueAttribute.filter((el) => el.id !== value)
      );
    }
    if (valueAttribute.length === 1) {
      return setIsModalVisible(true);
    }
  };

  const handleConfirm = (): void => {
    setIsModalVisible(false);
    handleValueAttribute([]);
    dispatch(variantActions.deleteAllVariant());
  };

  const handleCombine = (value: IAttribute[]) => {
    const newObject: IObjectAttribute = {};
    value.forEach((el) => {
      if (!newObject[el.name]) {
        newObject[el.name] = {
          id: uuidv4(),
          name: el.name,
          options: el.options
        };
      } else {
        newObject[el.name].options = newObject[el.name].options
          .concat(el.options)
          .filter(
            (ele, index, arr) =>
              index === arr.findIndex((element) => element.name === ele.name)
          );
      }
    });
    return Object.values(newObject);
  };

  const handleGetVariant = () => {
    dispatch(variantActions.getVariant(handleCombine(valueAttribute)));
  };

  const handleCancel = (): void => {
    setIsModalVisible(false);
  };

  const handleNewTag = (value: string) => {
    setNewTag(value);
  };

  const handleClick = (value: MouseEvent<HTMLDivElement>): void => {
    value.stopPropagation();
  };

  const handleOpenInputTag = (value: string) => {
    setIsIdtag(value);
  };

  return (
    <Form layout="vertical" className="attribute-form">
      <div className="attribute-content">
        <div className="flex justify-between">
          <h1 className="text-lg mb-2">Attribute</h1>
          {valueAttribute.length < 2 && (
            <Button
              type="link"
              icon={<AddIcon />}
              className="cursor-pointer"
              onClick={handleAddAttribute}
            />
          )}
        </div>
        <div>
          {valueAttribute.length > 0 ? (
            <div>
              {valueAttribute.map((el, index) => {
                const errorMes = errValidateAttribute(el);
                return (
                  <div key={el.id}>
                    <div className="flex item-center justify-between">
                      <Row>
                        <Form.Item label={`Name ${index + 1}`}>
                          <div className="select-name">
                            <CommonSelect
                              title="--Select Name--"
                              name={`status${el.id}`}
                              options={options}
                              onChange={(value: string) =>
                                handleSelectStatus(el, value)
                              }
                              onClick={(e: MouseEvent<HTMLDivElement>) =>
                                handleClick(e)
                              }
                            />
                          </div>
                        </Form.Item>
                      </Row>
                      <Row>
                        <Form.Item label={`Option ${index + 1}`}>
                          <div className="option-container">
                            <div className="option-content-container">
                              {el.options.map((option) => (
                                <div className="option-content" key={option.id}>
                                  <span>{option.name}</span>
                                  <Button
                                    type="link"
                                    icon={<CircleXIcon />}
                                    className="cursor-pointer "
                                    onClick={() =>
                                      handleDeleteTag(el.id, option.id)
                                    }
                                  />
                                </div>
                              ))}
                            </div>
                            {isIdTag === el.id && (
                              <div className="tag">
                                <Input
                                  className="input-tag"
                                  value={newtag}
                                  onChange={(e) => handleNewTag(e.target.value)}
                                  onPressEnter={() => handleSaveTag(el.id)}
                                  onBlur={() => handleSaveTag(el.id)}
                                />
                              </div>
                            )}
                            <Button
                              type="link"
                              icon={<AddIcon />}
                              className="add-tag"
                              onClick={() => handleOpenInputTag(el.id)}
                            >
                              <span>Add</span>
                            </Button>
                          </div>
                        </Form.Item>
                      </Row>
                      <Button
                        type="link"
                        icon={<TrashAltIcon />}
                        className="bin-icon"
                        onClick={() => handleDeleteAttribute(el.id)}
                      />
                    </div>
                    <div className="error-form">
                      <span className="ant-form-item-explain-error">
                        {errorMes}
                      </span>
                    </div>
                  </div>
                );
              })}
              <CommonButton
                block={true}
                reverseIcon={true}
                disabled={validateAttribute}
                variant="dashed"
                space="space-medium"
                className="button-variants"
                onClick={handleGetVariant}
              >
                Generate Variants
              </CommonButton>
            </div>
          ) : (
            <div className="attribute-description">
              More models if this product has multiple versions, for the example
              multiple sizes or corlors
            </div>
          )}
        </div>
        <ConfirmModal
          visible={isModalVisible}
          okText={"Delete"}
          onOk={handleConfirm}
          onCancel={handleCancel}
        >
          Delete this attribute and clear your variant?
        </ConfirmModal>
      </div>
    </Form>
  );
}
