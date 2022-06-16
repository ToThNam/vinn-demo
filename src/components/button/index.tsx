import { Button } from "antd";
import { ButtonProps, ButtonType } from "antd/lib/button/button";
import clsx from "clsx";

import "./styles.scss";

type ButtonSpace = "space-small" | "space-medium" | "space-large";

interface CommonButtonProps extends ButtonProps {
  variant?: keyof typeof classByVariant;
  space?: ButtonSpace;
  reverseIcon?: boolean;
  customWidth?: boolean;
}

const classByVariant: Record<ButtonType, string> = {
  primary: "primary-button",
  default: "",
  ghost: "",
  dashed: "dashed-button",
  link: "",
  text: ""
};
const classBySpace: Record<ButtonSpace, string> = {
  "space-small": "space-small",
  "space-medium": "space-medium",
  "space-large": "space-large"
};

export function CommonButton({
  variant = "primary",
  space = "space-medium",
  className,
  customWidth = false,
  reverseIcon = false,
  ...props
}: CommonButtonProps) {
  return (
    <Button
      {...props}
      type={variant}
      className={clsx(
        classByVariant[variant],
        classBySpace[space],
        !className?.includes("font-") && "font-semibold",
        customWidth ? "custom-width" : "",
        { "reverse-icon": reverseIcon },
        className
      )}
    />
  );
}

CommonButton.defaultProps = {
  variant: "primary",
  space: "space-medium",
  customWidth: false,
  reverseIcon: false
};
