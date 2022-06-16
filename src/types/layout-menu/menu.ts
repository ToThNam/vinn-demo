import { ReactNode } from "react";

export type Icon = React.FC<React.SVGProps<SVGSVGElement>>;

export type MenuItem = {
  id: string | number;
  path: string;
  name: string;
  icon?: Icon;
  element?: ReactNode;
};
