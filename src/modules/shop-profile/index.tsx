import { message, Form } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Image } from "cloudinary-react";

import CommonModal from "components/modal/common-modal";
import { CameraIcon, PencilIcon } from "assets/icons";
import { CommonButton } from "components/button";
import { TextArea } from "components/form-control/text-area";
import TextInput from "components/form-control/text-input";
import Loading from "components/loading";
import { useAppDispatch } from "store/hooks";
import { createShop } from "store/shop-slice/shopSlice";
import "./styles.scss";

export default function ShopProfileForm() {
  const dispatch = useAppDispatch();
  const [images, setImages] = useState("");
  const [imageCover, setImageCover] = useState("");
  const [preview, setPreview] = useState("");
  const [previewCover, setPreviewCover] = useState("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isModalVisibleCover, setIsModalVisibleCover] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState<boolean>(false);
  const [isLoadingCover, setIsLoadingCover] = useState<boolean>(false);
  const [isLoadingCoverImage, setIsLoadingCoverImage] =
    useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [selectedFileCover, setSelectedFileCover] = useState<File>();
  const [selectedBase64, setSelectedBase64] = useState<string>("");
  const [selectedBase64Cover, setSelectedBase64Cover] = useState("");
  const [valueShopName, setShopName] = useState("");
  const [valueShopDescription, setShopDescription] = useState("");
  const [isButton, setIsButton] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(true);
  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  useEffect(() => {
    if (!selectedFileCover) {
      setPreviewCover("");
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFileCover);
    setPreviewCover(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFileCover]);

  const handleEditProfileShop = () => {
    setIsButton(true);
    setIsDisable(false);
  };
  const handleCancelEditProfileShop = () => {
    setIsButton(false);
    setIsDisable(true);
  };
  const success = () => {
    message.success("Shop has been successfully added");
  };
  const error = () => {
    message.error("Shop has not been successfully added");
  };
  const handleShopName = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setShopName(e.target.value);
  };
  const handleShopDescription = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setShopDescription(e.target.value);
  };
  const handleAddShop = () => {
    const data = {
      id: uuidv4(),
      key: uuidv4(),
      avatarShopImage: images,
      coverShopImage: imageCover,
      shopName: valueShopName,
      shopDescription: valueShopDescription
    };
    if (valueShopDescription === "" || valueShopName === "") {
      error();
    } else {
      dispatch(createShop(data));
      success();
    }
  };
  const handleSaveCover = async () => {
    const formData = new FormData();
    formData.append("file", selectedBase64Cover as string);
    formData.append("cloud_name", "dtjkvn5ze");
    formData.append("upload_preset", "jtajajkh");
    setIsLoadingCover(true);
    setIsLoadingCoverImage(false);
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dtjkvn5ze/image/upload",
        formData
      );
      setIsModalVisibleCover(false);
      const { data } = response;
      setImageCover(data.secure_url);
    } catch (Error: any) {
      console.log(Error);
    }
    setIsLoadingCover(false);
  };
  const handleCoverCancel = (): void => {
    setIsModalVisibleCover(false);
  };
  const getBase64 = (file: Blob) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (Error) => reject(Error);
    });
  const onSelectFileCover = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFileCover(undefined);
      return;
    }
    setSelectedFileCover(e.target.files[0]);
    getBase64(e.target.files[0]).then((data) => setSelectedBase64Cover(data));
    setIsModalVisibleCover(true);
    setIsLoadingCoverImage(true);
  };
  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
    getBase64(e.target.files[0]).then((data) => setSelectedBase64(data));
    setIsModalVisible(true);
    setIsLoadingAvatar(true);
  };
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("file", selectedBase64 as string);
    formData.append("cloud_name", "dtjkvn5ze");
    formData.append("upload_preset", "xmenl9o4");
    setIsLoading(true);
    setIsLoadingAvatar(false);
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dtjkvn5ze/image/upload",
        formData
      );
      setIsModalVisible(false);
      const { data } = response;
      setImages(data.secure_url);
    } catch (Error: any) {
      console.log(Error);
    }
    setIsLoading(false);
  };
  const handleCancel = (): void => {
    setIsModalVisible(false);
  };

  return (
    <div className="container">
      <Form layout="vertical" className="form-shop-profile">
        {imageCover === "" ? (
          <Form.Item>
            <div className="add-image-cover">
              <div className="shop-profile-uploader">
                <input type="file" onChange={onSelectFileCover} />
                <CameraIcon />
                <span> Edit cover</span>
              </div>
            </div>
          </Form.Item>
        ) : (
          <Form.Item>
            <div className="image-cover">
              {isLoadingCover ? (
                <Loading />
              ) : (
                <div className="image-cover-available">
                  <Image
                    cloudName="dtjkvn5ze"
                    publicId={imageCover}
                    className="cover"
                  />

                  <div className="shop-profile-uploader">
                    <input type="file" onChange={onSelectFileCover} />
                    <CameraIcon />
                    <span> Edit cover</span>
                  </div>
                </div>
              )}
            </div>
          </Form.Item>
        )}
        <Form.Item>
          <div className="image-avatar">
            {images === "" ? (
              <div className="add-image-avatar">
                <div className="round">
                  <input type="file" onChange={onSelectFile} />
                  <CameraIcon />
                </div>
              </div>
            ) : (
              <div>
                <div className="image-avatar-available">
                  {isLoading ? (
                    <Loading />
                  ) : (
                    <div>
                      <Image
                        cloudName="dtjkvn5ze"
                        publicId={images}
                        className="avatar"
                      />

                      <div className="round">
                        <input type="file" onChange={onSelectFile} />
                        <CameraIcon />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Form.Item>
        <CommonModal
          visible={isModalVisible}
          width={680}
          title={"Edit Profile Picture"}
          okText={isLoadingAvatar ? "Save" : <Loading />}
          onOk={handleSave}
          onCancel={handleCancel}
        >
          <img src={preview} className="preview-avatar-image" alt="" />
        </CommonModal>
        <CommonModal
          visible={isModalVisibleCover}
          width={680}
          title={"Edit Cover Picture"}
          okText={isLoadingCoverImage ? "Save" : <Loading />}
          onOk={handleSaveCover}
          onCancel={handleCoverCancel}
        >
          <img src={previewCover} className="preview-avatar-image" alt="" />
        </CommonModal>
        <Form.Item
          rules={[{ required: true, message: "This is required field" }]}
          name="shopName"
        >
          <TextInput
            prefix
            disabled={isDisable}
            name="shopName"
            label="Shop's Name*"
            placeholder={"Atlan Shop"}
            onChange={handleShopName}
            value={valueShopName}
          />
        </Form.Item>
        <Form.Item
          name="shopDescription"
          label="Shop Description*"
          rules={[
            { required: true, message: "This is required field" },
            {
              min: 30,
              max: 500,
              message: "Shop name is between 30 to 500 characters"
            }
          ]}
        >
          <TextArea
            disabled={isDisable}
            placeholder={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliq"
            }
            autosize={{ minRows: 5, maxRows: 15 }}
            onChange={handleShopDescription}
            value={valueShopDescription}
          />
        </Form.Item>
        <Form.Item>
          <div>
            {isButton ? (
              <div className="button-form">
                <CommonButton
                  variant="dashed"
                  className="btn-cancel-edit-profile"
                  onClick={handleCancelEditProfileShop}
                >
                  Cancel
                </CommonButton>
                <CommonButton
                  variant="primary"
                  className="btn-save-edit-profile"
                  onClick={handleAddShop}
                >
                  Save
                </CommonButton>
              </div>
            ) : (
              <CommonButton
                variant="dashed"
                block={true}
                icon={<PencilIcon />}
                className="btn-edit-profile"
                onClick={handleEditProfileShop}
              >
                Edit seller profile
              </CommonButton>
            )}
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
