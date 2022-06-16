import { SearchIcon } from "assets/icons";
import { CommonButton } from "components/button";
import TextInput from "components/form-control/text-input";
import "./styles.scss";

const SearchButton = () => (
  <CommonButton className="search-button-container">Search</CommonButton>
);

export default function ProductSearch() {
  return (
    <TextInput
      prefix={<SearchIcon />}
      placeholder={"Product Name"}
      suffix={<SearchButton />}
    />
  );
}
