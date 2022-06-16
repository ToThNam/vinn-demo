import React from "react";

export interface IProduct {
  id: string;
  key: string;
  name: string;
  image: string[];
  category: ICategorySelected;
  description: string;
  status: string;
  originalPrice: number;
  discountPrice: number;
  productSku: string;
  productQuantity: number;
  createdDate: string;
  attributes?: IAttribute[];
  variants?: IVariant[];
}

export interface IOption {
  id: string;
  name: string;
}

export interface IAttribute {
  name: string;
  id: string;
  options: IOption[];
}

export interface IVariant {
  id: string;
  key: string;
  variantName: string;
  discountPrice: number | string;
  originPrice: number | string;
  quantity: number | string;
  sku: string;
}

export interface IChipSelected {
  title: string;
  key: React.Key;
  children?: [];
}

export type ICategorySelected = Pick<IChipSelected, "title" | "key">;
