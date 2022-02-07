import * as React from "react";
import { ReactElement, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

type Props = {
  children: ReactElement;
  fields: { name: string; onClick: () => void; icon?: ReactElement }[];
  anchor?: "left" | "top" | "right" | "bottom";
};

export const AreaWithSideMenu = (props: Props): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const isAnyIcon: boolean = props.fields.filter((it) => it.icon).length > 0;

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Box onClick={open}>{props.children}</Box>
      <Drawer anchor={props.anchor} open={isOpen} onClose={close}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {props.fields.map((field, index) => (
              <ListItem
                button
                key={index}
                onClick={() => {
                  field.onClick();
                  close();
                }}
              >
                {isAnyIcon && <ListItemIcon>{field.icon}</ListItemIcon>}
                <ListItemText primary={field.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
