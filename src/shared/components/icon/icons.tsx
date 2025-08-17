import { MdOutlineContentCut, MdOutlineWaterDrop } from "react-icons/md";
import { IconComponentProps } from "./icon.interface";
import { SiGumtree } from "react-icons/si";
import { LuBug } from "react-icons/lu";

export const getIcon = ({ iconName, ...rest }: IconComponentProps) => {
  return {
    MdOutlineContentCut: <MdOutlineContentCut {...rest} />,
    MdOutlineWaterDrop: <MdOutlineWaterDrop {...rest} />,
    SiGumtree: <SiGumtree {...rest} />,
    LuBug: <LuBug {...rest} />,
  }[iconName];
};
