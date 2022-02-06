import * as React from "react";
import { CSSProperties, ReactElement, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { v4 as uuidV4 } from "uuid";

type Props = {
  children: ReactElement;
  fields: { name: string; onClick: () => void }[];
  iconStyles?: CSSProperties;
};

export const AriaWithPopupMenu = (props: Props): ReactElement => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [uuid] = useState<string>(uuidV4());

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleCloseMenu = (action?: () => void) => {
    action && action();
    setAnchor(null);
  };

  return (
    <>
      <IconButton
        aria-controls={uuid}
        onClick={handleOpenMenu}
        style={props.iconStyles}
        aria-haspopup
      >
        {props.children}
      </IconButton>
      <Menu
        id={uuid}
        open={!!anchor}
        onClose={() => handleCloseMenu()}
        anchorEl={anchor}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {props.fields.map((field, id) => (
          <MenuItem key={id} onClick={() => handleCloseMenu(field.onClick)}>
            <Typography>{field.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
