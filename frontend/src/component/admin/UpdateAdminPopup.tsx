import * as React from "react";
import { ReactElement, useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AdminRoles } from "../../dto/AdminRoles";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { AdminUpdateRequest } from "../../dto/request/AdminUpdateRequest";
import { AdminInfoResponse } from "../../dto/response/AdminInfoResponse";
import { AdminContext } from "../../util/AdminContext";

interface Props {
  isOpen: boolean;
  cansel: () => void;
  agree: (request: AdminUpdateRequest) => void;
  updatingAdmin?: AdminInfoResponse;
}

export const UpdateAdminPopup = (props: Props): ReactElement => {
  const adminContext = useContext(AdminContext);
  const [roles, setRoles] = useState<AdminRoles[]>([]);
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (!props.updatingAdmin) {
      return;
    }
    setRoles(props.updatingAdmin.roles);
  }, [props]);

  const submit = () => {
    props.agree({
      id: props.updatingAdmin!.id,
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
          value={props.updatingAdmin?.username}
          disabled
        />
        <TextField
          variant={"outlined"}
          margin={"dense"}
          label={"Email"}
          value={props.updatingAdmin?.email}
          disabled
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Label placement</FormLabel>
          <FormGroup aria-label="position" row>
            {Object.keys(AdminRoles).map((role) => (
              <FormControlLabel
                key={role}
                label={role}
                disabled={
                  adminContext.admin?.email === props.updatingAdmin?.email &&
                  role === AdminRoles.SUPER_ADMIN
                }
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
