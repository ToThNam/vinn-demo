import axiosClient from "services";

import { IShop } from "types/shops/shops";

export type UpdateShopRequest = Omit<IShop, "id">;
const ShopServices = {
  createShop(body: UpdateShopRequest): Promise<IShop> {
    const url: string = `/shops`;
    return axiosClient.post(url, body);
  }
};
export default ShopServices;
