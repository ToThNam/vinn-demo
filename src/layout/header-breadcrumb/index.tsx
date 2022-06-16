import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

import { SeparatorIcon } from "assets/icons";
import { breadcrumbAddress } from "./constants";
import "./styles.scss";

export default function HeaderBreadcrumb() {
  const loaction = useLocation();
  const pathSnippets = loaction.pathname.split("/").filter((i) => i);
  const breadcrumbSnippets = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;

    return (
      <Breadcrumb.Item key={url} className="breadcrumb-item">
        {index === 0 ? (
          <p>{breadcrumbAddress[url]}</p>
        ) : (
          <Link to={url}>{breadcrumbAddress[url]}</Link>
        )}
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItem = breadcrumbSnippets.filter(
    (item) => item.key !== "/shop-profile/my-shop"
  );

  return (
    <Breadcrumb separator={<SeparatorIcon />}>{breadcrumbItem}</Breadcrumb>
  );
}
