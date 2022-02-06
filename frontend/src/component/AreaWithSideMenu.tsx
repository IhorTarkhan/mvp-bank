import * as React from "react";
import { ReactElement, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

type Props = {
  children: ReactElement;
  fields: { name: string; onClick: () => void; icon?: ReactElement }[];
  anchor?: "left" | "top" | "right" | "bottom";
};

export const AreaWithSideMenu = (props: Props): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Box onClick={open} aria-haspopup>
        {props.children}
      </Box>
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
                <ListItemIcon>
                  {field.icon}
                  {index % 2 ? <MailIcon /> : <InboxIcon />}
                </ListItemIcon>
                <ListItemText primary={field} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
