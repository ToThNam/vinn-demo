import {
  HamburgerStoreIcon,
  HamburgerProductIcon,
  HamburgerOrderIcon,
  HamburgerAddressIcon,
  VideoIcon
} from "assets/icons";
import { ShopProfile, Product, Video, Order, Address } from "pages";
import { MenuItem } from "types/layout-menu/menu";
import { shopProfile, product, video, order, address } from "./routes.paths";

export const MenuSidebar: MenuItem[] = [
  {
    id: "01",
    name: "Shop Profile",
    icon: HamburgerStoreIcon,
    path: shopProfile.PATH_SHOP_PROFILE,
    element: <ShopProfile />
  },
  {
    id: "02",
    name: "Product",
    icon: HamburgerProductIcon,
    path: product.PATH_PRODUCT,
    element: <Product />
  },
  {
    id: "03",
    name: "Video",
    icon: VideoIcon,
    path: video.PATH_VIDEO,
    element: <Video />
  },
  {
    id: "04",
    name: "Order",
    icon: HamburgerOrderIcon,
    path: order.PATH_ORDER,
    element: <Order />
  },
  {
    id: "05",
    name: "Address",
    icon: HamburgerAddressIcon,
    path: address.PATH_ADDRESS,
    element: <Address />
  }
];
