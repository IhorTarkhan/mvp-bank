import * as React from "react";
import { ReactElement, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { v4 as uuidV4 } from "uuid";
import { Box } from "@mui/material";

type Props = {
  children: ReactElement;
  fields: { name: string; onClick: () => void }[];
};

export const AriaWithPopupMenu = (props: Props): ReactElement => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [uuid] = useState<string>(uuidV4());

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchor(null);
  };

  return (
    <>
      <Box
        aria-controls={uuid}
        onClick={handleOpenMenu}
        aria-haspopup
        style={{ cursor: "pointer" }}
      >
        {props.children}
      </Box>
      <Menu
        id={uuid}
        open={!!anchor}
        onClose={handleCloseMenu}
        anchorEl={anchor}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {props.fields.map((field, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              field.onClick();
              handleCloseMenu();
            }}
          >
            <Typography>{field.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
