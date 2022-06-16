import React, { useState } from "react";
import { Divider } from "antd";

import ProductSearchSortFilter from "modules/product/search-sort-filter";
import ProductList from "modules/product/product-list";

export default function Product() {
  const [selectedRowIDs, setSelectedRowIDs] = useState<React.Key[]>([]);

  const handleSelectedRowIDs = (value: React.Key[]) => {
    setSelectedRowIDs(value);
  };

  return (
    <div className="bg-white">
      <ProductSearchSortFilter
        selectedRowIDs={selectedRowIDs}
        handleSelectedRowIDs={handleSelectedRowIDs}
      />
      <Divider />
      <ProductList
        selectedRowIDs={selectedRowIDs}
        handleSelectedRowIDs={handleSelectedRowIDs}
      />
    </div>
  );
}
