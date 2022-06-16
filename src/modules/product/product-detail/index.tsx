import { useState, useMemo } from "react";
import { Form, Row, InputNumber, Input, Button } from "antd";
import { Image } from "cloudinary-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import Loading from "components/loading";
import CommonSelect from "components/select";
import TextInput from "components/form-control/text-input";
import { getBase64 } from "utils/helper";
import {
  IProduct,
  IAttribute,
  IVariant,
  ICategorySelected
} from "types/products/products";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { listVariant, listAttribute } from "store/product-slice/variant.Slice";
import { createProduct } from "store/product-slice/product.Slice";
import { AddIcon, ArrowRightIcon, CircleXIcon } from "assets/icons";
import { CommonButton } from "components/button";
import { ConfirmModal } from "components/modal/confirm-modal";
import { TextArea } from "components/form-control/text-area";
import { options } from "./constants";
import Attribute from "./attribute";
import Variant from "./variant";
import SelectCategoryForm from "../select-category-form";
import "./styles.scss";

export default function ProductDetail() {
  const dispatch = useAppDispatch();
  const variant: IVariant[] = useAppSelector(listVariant);
  const attribute: IAttribute[] = useAppSelector(listAttribute);

  const [pending, setPending] = useState<boolean>(false);
  const [imageList, setImageList] = useState<string[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [original, setOriginalPrice] = useState<number>(0);
  const [discount, setDiscountPrice] = useState<number>(0);
  const [sku, setProductSku] = useState<string>("");
  const [quantity, setproductQuantity] = useState<number>(0);
  const [productDescription, setProductDescription] = useState<string>("");
  const [isCateRequired, setIsCateRequired] = useState<boolean>(false);
  const [categorySelect, setCategorySelect] = useState<ICategorySelected[]>([]);
  const [isSelectedVisible, setIsSelectedVisible] = useState<boolean>(false);
  const [valueAttribute, setValueAttribute] = useState<IAttribute[]>([]);
  const [validateAttributeVariant, setValidateAttributeVariant] =
    useState<boolean>(false);
  const [valueStatus, setValueStatus] = useState<string>("");
  const [confirmSave, setConfirmSave] = useState<boolean>(false);
  const [confirmCancel, setConfirmCancel] = useState<boolean>(false);

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleImageList = (value: string) => {
    const data: string[] = [...imageList, value];
    setImageList(data);
    setPending(false);
  };

  const onSelectFile = (value: any) => {
    if (!value.target.files || value.target.files.length === 0) {
      return;
    }
    getBase64(value.target.files[0]).then((data) => {
      const formData = new FormData();
      setPending(true);
      formData.append("file", data as string);
      formData.append("upload_preset", "exp8ayip");
      formData.append("cloud_name", "tothenam");
      axios
        .post("https://api.cloudinary.com/v1_1/tothenam/image/upload", formData)
        .then((response) => {
          handleImageList(response.data.secure_url);
        })
        .catch((error) => console.log(error));
    });
  };

  const handleDeleteImage = (value: string) => {
    const afterDelete: string[] = imageList.filter((el) => el !== value);
    setImageList(afterDelete);
  };

  const category = useMemo(() => {
    if (!categorySelect.length) {
      return "Select category";
    }
    const title = categorySelect.map((el) => el.title);
    if (categorySelect.length) {
      return `${title}`;
    }
  }, [categorySelect]);

  const categoryRequired = useMemo(() => {
    if (!categorySelect.length) {
      return "This is required field";
    }
    if (categorySelect.length) {
      return "";
    }
  }, [categorySelect]);

  const handleShowModal = () => {
    setIsSelectedVisible(!isSelectedVisible);
  };

  const handleCancel = () => {
    setIsSelectedVisible(false);
  };

  const handleSave = () => {
    setIsSelectedVisible(false);
  };

  const handleSelectStatus = (value: string): void => {
    setValueStatus(value);
  };

  const handleValueAttribute = (value: IAttribute[]) => {
    setValueAttribute(value);
  };

  const handleCategorySelected = (value: ICategorySelected[]) => {
    setCategorySelect(value);
  };

  const handleSelectName = (value: string): void => {
    setProductName(value);
  };

  const handleSelectDescription = (value: string): void => {
    setProductDescription(value);
  };

  const handleOriginalPrice = (value: number): void => {
    setOriginalPrice(value);
  };

  const handleDiscountPrice = (value: number): void => {
    setDiscountPrice(value);
  };

  const handleProductSku = (value: string): void => {
    setProductSku(value);
  };

  const handleProductQuantity = (value: number): void => {
    setproductQuantity(value);
  };

  const handleValidateAttributeVariant = (value: boolean): void => {
    setValidateAttributeVariant(value);
  };

  const handleSaveNewDetailIsFail = () => {
    if (categoryRequired !== "") {
      setIsCateRequired(true);
    }
  };

  const handleClearData = () => {
    form.resetFields();
    setImageList([]);
    setCategorySelect([]);
    setValueAttribute([]);
  };

  const handleConfirmSave = () => {
    handleClearData();
    setConfirmSave(false);
  };

  const handleCancelSave = () => {
    setConfirmSave(false);
  };

  const handleConfirmCancel = () => {
    handleClearData();
    setConfirmCancel(false);
    navigate(-1);
  };

  const handleCancelCancel = () => {
    setConfirmCancel(false);
  };

  const handleCancelSaveNewProduct = () => {
    setConfirmCancel(true);
  };

  const handleSaveNewDetailIsSucces = async () => {
    const cate = { ...categorySelect[0] };
    const keyid = uuidv4();
    const value: IProduct = {
      id: keyid,
      key: keyid,
      name: productName,
      image: imageList,
      category: cate,
      description: productDescription,
      status: valueStatus,
      originalPrice: original,
      discountPrice: discount,
      productSku: sku,
      productQuantity: quantity,
      createdDate: new Date().toDateString(),
      attributes: attribute,
      variants: variant
    };
    try {
      await dispatch(createProduct(value));
      setConfirmSave(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product-detail">
      <Form
        layout="vertical"
        className="form-container"
        form={form}
        onFinish={handleSaveNewDetailIsSucces}
        onFinishFailed={handleSaveNewDetailIsFail}
      >
        <div className="form-style">
          <div className="basic-information-content">
            <h1 className="text-lg mb-2">Basic Information</h1>
            <Row>
              <Form.Item
                label="Product Name*"
                name="productName"
                rules={[{ required: true, message: "This is required field" }]}
              >
                <div className="input-name">
                  <TextInput
                    prefix
                    placeholder={"Text Input"}
                    onChange={(e: { target: { value: string } }) =>
                      handleSelectName(e.target.value)
                    }
                  />
                </div>
              </Form.Item>
            </Row>
            <Row>
              <Form.Item
                label="Image*"
                name="productImage"
                rules={[{ required: true, message: "This is required field" }]}
              >
                <div className="add-image-list">
                  {imageList.map((el, index) => (
                    <div className="image-list" key={index}>
                      <Image
                        cloudName="tothenam"
                        publicId={el}
                        className="product-image"
                      />
                      <span className="image-title">
                        {index === 0 ? "Cover Image" : `Image ${index}`}
                      </span>
                      <div className="image-icon">
                        <Button
                          type="link"
                          icon={<CircleXIcon />}
                          className="product-icon"
                          onClick={() => handleDeleteImage(el)}
                        />
                      </div>
                    </div>
                  ))}
                  {pending && (
                    <div className="round-loading">
                      <Loading />
                    </div>
                  )}
                  {imageList.length < 4 && (
                    <div className="button-add-image-list">
                      <label htmlFor="uploadImage" className="round">
                        <AddIcon />
                        <div className="add-image-title">Add Image</div>
                      </label>
                      <Input
                        id="uploadImage"
                        type="file"
                        hidden
                        className="product-uploader"
                        onChange={onSelectFile}
                      />
                      <div className="image-title">
                        Image {imageList.length}
                      </div>
                    </div>
                  )}
                </div>
              </Form.Item>
            </Row>
            <Row>
              <Form.Item label="Categories*" name="selectCategoryProduct">
                <div className="select-tree-button " onClick={handleShowModal}>
                  {categorySelect.length > 0 ? (
                    <span className="text-gray-900 ml-2">{category}</span>
                  ) : (
                    <span className="text-gray-400 ml-2">Select category</span>
                  )}
                  <ArrowRightIcon />
                </div>
                {isCateRequired && (
                  <div className="error-form">
                    <span className="ant-form-item-explain-error">
                      {categoryRequired}
                    </span>
                  </div>
                )}
              </Form.Item>
            </Row>
            <Row>
              <Form.Item
                label="Product Description*"
                name="productDescription"
                rules={[
                  { required: true, message: "This is required field" },
                  {
                    min: 30,
                    max: 500,
                    message: "Product name is between 30 to 500 characters"
                  }
                ]}
              >
                <TextArea
                  placeholder={"Type description here"}
                  autosize={{ minRows: 5, maxRows: 10 }}
                  onChange={(e) => handleSelectDescription(e.target.value)}
                />
              </Form.Item>
            </Row>
            <Row className="select-status">
              <Form.Item
                label="Status*"
                name="productStatus"
                rules={[{ required: true, message: "This is required field" }]}
              >
                <CommonSelect
                  title="--Select Status--"
                  name="productStatus"
                  options={options}
                  value={valueStatus}
                  onChange={(value: string) => handleSelectStatus(value)}
                />
              </Form.Item>
            </Row>
          </div>
        </div>
        <div className="form-style">
          <div className="price-inventory-content ">
            <div className="price-inventory">
              <h1 className="text-lg mb-2">Price</h1>
              <div className="flex justify-between">
                <Row>
                  <Form.Item
                    label="Original Price*"
                    name="originalPrice"
                    className="form-input"
                    rules={[
                      { required: true, message: "This is required field" }
                    ]}
                  >
                    <InputNumber
                      maxLength={9}
                      min={0}
                      placeholder="€0.00"
                      onChange={handleOriginalPrice}
                    />
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item label="Discount Price" name="discountPrice">
                    <InputNumber
                      maxLength={9}
                      min={0}
                      placeholder="€0.00"
                      onChange={handleDiscountPrice}
                    />
                  </Form.Item>
                </Row>
              </div>
            </div>
            <div className="price-inventory">
              <h1 className="text-lg mb-2">Inventory</h1>
              <div className="flex justify-between">
                <Row>
                  <Form.Item label="SKU#" name="sku">
                    <div className="sku-input">
                      <TextInput
                        prefix
                        placeholder={"#"}
                        onChange={(e: { target: { value: string } }) =>
                          handleProductSku(e.target.value)
                        }
                      />
                    </div>
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item
                    label="Quantity*"
                    name="quantity"
                    className="form-input"
                    rules={[
                      { required: true, message: "This is required field" }
                    ]}
                  >
                    <InputNumber
                      maxLength={9}
                      min={0}
                      placeholder="0"
                      onChange={handleProductQuantity}
                    />
                  </Form.Item>
                </Row>
              </div>
            </div>
          </div>
        </div>
        <Attribute
          valueAttribute={valueAttribute}
          handleValueAttribute={handleValueAttribute}
          validateAttribute={validateAttributeVariant}
          handleValidateAttribute={handleValidateAttributeVariant}
        />
        {variant.length > 0 && (
          <Variant
          validateVariant={validateAttributeVariant}
          handleValidateVariant={handleValidateAttributeVariant}
          />
        )}
        <div className="form-style">
          <div className="group-save-cancel-button">
            <div className="cancel-save-button">
              <CommonButton
                block={true}
                reverseIcon={true}
                variant="dashed"
                space="space-medium"
                className="button-container"
                onClick={handleCancelSaveNewProduct}
              >
                Cancel
              </CommonButton>
              <CommonButton
                block={true}
                reverseIcon={true}
                htmlType="submit"
                space="space-medium"
                className="button-container"
                disabled={validateAttributeVariant}
              >
                Save
              </CommonButton>
            </div>
          </div>
        </div>
      </Form>
      <SelectCategoryForm
        title="Select Category"
        chipSelected={[]}
        checkable={false}
        selectable={true}
        handleCategorySelected={handleCategorySelected}
        isActive={isSelectedVisible}
        onCancel={handleCancel}
        onSave={handleSave}
      />
      <ConfirmModal
        visible={confirmSave}
        okText={"Ok"}
        onOk={handleConfirmSave}
        onCancel={handleCancelSave}
      >
        Create new product success!
      </ConfirmModal>
      <ConfirmModal
        visible={confirmCancel}
        okText={"Yes"}
        onOk={handleConfirmCancel}
        onCancel={handleCancelCancel}
      >
        Are you sure to go back without saving?
      </ConfirmModal>
    </div>
  );
}
