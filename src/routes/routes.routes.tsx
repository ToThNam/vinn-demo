import { RouteObject } from "react-router-dom";

import AppLayout from "layout";
import ProductDetail from "modules/product/product-detail";
import {
  LoginLayout,
  ShopProfile,
  Product,
  Video,
  Order,
  Address,
  ForgotPasswordLayout,
  ChangePasswordLayout,
  VerifyCodeLayout,
  ChangePasswordSuccessLayout,
} from "pages";
import {
  login,
  shopProfile,
  product,
  productDetail,
  video,
  order,
  address,
  forgotPassword,
  changePassword,
  verifyCode,
  changePasswordSuccess,
} from "./routes.paths";

export const routes: RouteObject[] = [
  { path: login.PATH_LOGIN, element: <LoginLayout /> },
  {
    path: forgotPassword.PATH_Forgot_Password,
    element: <ForgotPasswordLayout />
  },
  {
    path: changePassword.PATH_Change_Password,
    element: <ChangePasswordLayout />
  },
  {
    path: verifyCode.PATH_Verify_Code,
    element: <VerifyCodeLayout />
  },
  {
    path: changePasswordSuccess.PATH_Change_Password_Success,
    element: <ChangePasswordSuccessLayout />
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <ShopProfile /> },
      {
        path: shopProfile.PATH_SHOP_PROFILE,
        element: <ShopProfile />
      },
      {
        path: product.PATH_PRODUCT,
        element: <Product />
      },
      {
        path: productDetail.PATH_PRODUCT_DETAIL,
        element: <ProductDetail />
      },
      {
        path: video.PATH_VIDEO,
        element: <Video />
      },
      {
        path: order.PATH_ORDER,
        element: <Order />
      },
      {
        path: address.PATH_ADDRESS,
        element: <Address />
      }
    ]
  }
];
