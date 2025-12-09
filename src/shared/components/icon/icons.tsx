import {
  MdOutlineCategory,
  MdOutlineContentCut,
  MdOutlineDashboard,
  MdOutlineWaterDrop,
} from "react-icons/md";
import { IconComponentProps } from "./icon.interface";
import { SiGumtree } from "react-icons/si";
import { LuBug } from "react-icons/lu";
import { TbLogout2, TbPlant } from "react-icons/tb";

export const getIcon = ({ iconName, ...rest }: IconComponentProps) => {
  return {
    MdOutlineContentCut: <MdOutlineContentCut {...rest} />,
    MdOutlineWaterDrop: <MdOutlineWaterDrop {...rest} />,
    SiGumtree: <SiGumtree {...rest} />,
    LuBug: <LuBug {...rest} />,
    MdOutlineDashboard: <MdOutlineDashboard {...rest} />,
    TbPlant: <TbPlant {...rest} />,
    MdOutlineCategory: <MdOutlineCategory {...rest} />,
    TbLogout2: <TbLogout2 {...rest} />,
  }[iconName];
};
