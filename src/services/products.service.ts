import axiosClient from "services";

import { IProduct } from "types/products/products";

export type UpdateProductRequest = Omit<IProduct, "id">;

const ProductServices = {
  getAllProduct(): Promise<IProduct[]> {
    const url: string = `/products`;
    return axiosClient.get(url);
  },
  getProductById(id: string): Promise<IProduct> {
    const url: string = `/products/${id}`;
    return axiosClient.get(url);
  },
  createProduct(body: UpdateProductRequest): Promise<IProduct> {
    const url: string = `/products`;
    return axiosClient.post(url, body);
  },
  updateProduct(id: string, body: UpdateProductRequest): Promise<IProduct> {
    const url: string = `/products/${id}`;
    return axiosClient.put(url, body);
  },
  deleteProduct(id: string): Promise<IProduct> {
    const url: string = `/products/${id}`;
    return axiosClient.delete(url);
  }
};

export default ProductServices;
