import * as React from "react";
import { ReactElement } from "react";
import MailIcon from "@mui/icons-material/Mail";
import { ClientAbstractHeader } from "./CleentAbstractHeader";

export const Header = (): ReactElement => {
  const pages = [
    {
      name: "Products",
      onClick: () => console.log("page = Products"),
      icon: <MailIcon />,
    },
    {
      name: "Pricing",
      onClick: () => console.log("page = Pricing"),
    },
    {
      name: "Blog",
      onClick: () => console.log("page = Blog"),
    },
  ];
  const settings = [
    {
      name: "Profile",
      onClick: () => console.log("setting = Profile"),
    },
    {
      name: "Account",
      onClick: () => console.log("setting = Account"),
    },
    {
      name: "Dashboard",
      onClick: () => console.log("setting = Dashboard"),
      icon: <MailIcon />,
    },
    {
      name: "Logout",
      onClick: () => console.log("setting = Logout"),
    },
  ];
  return <ClientAbstractHeader pages={pages} settings={settings} />;
};
