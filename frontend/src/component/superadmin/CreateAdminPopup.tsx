import * as React from "react";
import { ReactElement, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AdminCreateRequest } from "../../dto/request/admin/superadmin/AdminCreateRequest";
import { AdminRoles } from "../../dto/AdminRoles";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";

interface Props {
  isOpen: boolean;
  cansel: () => void;
  agree: (request: AdminCreateRequest) => void;
}

export const CreateAdminPopup = (props: Props): ReactElement => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [roles, setRoles] = useState<AdminRoles[]>([]);
  const [password, setPassword] = useState<string>("");

  const submit = () => {
    props.agree({
      username: username,
      email: email,
      roles: roles,
      password: password,
    });
  };

  return (
    <Dialog open={props.isOpen} onClose={props.cansel} fullWidth>
      <DialogTitle>Create admin</DialogTitle>
      <DialogContent style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          variant={"outlined"}
          margin={"dense"}
          label={"Username"}
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <TextField
          variant={"outlined"}
          margin={"dense"}
          label={"Email"}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Label placement</FormLabel>
          <FormGroup aria-label="position" row>
            {Object.keys(AdminRoles).map((role) => (
              <FormControlLabel
                key={role}
                label={role}
                control={
                  <Checkbox
                    // @ts-ignore
                    checked={roles.indexOf(AdminRoles[role]) !== -1}
                    onClick={() => {
                      setRoles((prevState) => {
                        // @ts-ignore
                        const roleE = AdminRoles[role];
                        if (prevState.indexOf(roleE) === -1) {
                          prevState.push(roleE);
                          return [...prevState];
                        } else {
                          return [...prevState.filter((r) => r !== roleE)];
                        }
                      });
                    }}
                  />
                }
              />
            ))}
          </FormGroup>
        </FormControl>
        <TextField
          variant={"outlined"}
          margin={"dense"}
          label={"Password"}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.cansel}>Cancel</Button>
        <Button onClick={submit}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
};
