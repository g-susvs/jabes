import { IconComponentProps } from "./icon.interface";
import { FaArrowCircleRight } from "react-icons/fa";
import { getIcon } from "./icons";

export const Icon = ({ iconName, ...rest }: IconComponentProps) => {
  const icon = getIcon({ iconName, ...rest });

  return icon ? icon : <FaArrowCircleRight {...rest} />;
};
