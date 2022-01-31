import React, { ReactElement } from "react";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const ClientRegistrationScreen = (): ReactElement => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const emailLabel = "Email";
  const passwordLabel = "Password";
  const confirmPasswordLabel = "Confirm password";
  const registrationLabel = "Registration";

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      maxWidth={"500px"}
      marginX={"auto"}
      marginTop={"100px"}
      rowGap={"20px"}
    >
      <Typography variant={"h3"}>{registrationLabel}</Typography>
      <TextField
        variant={"outlined"}
        label={emailLabel}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <FormControl variant={"outlined"}>
        <InputLabel htmlFor={"password"}>{passwordLabel}</InputLabel>
        <OutlinedInput
          id={"password"}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          endAdornment={
            <IconButton
              onClick={() => setShowPassword((prevState) => !prevState)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          }
          label={passwordLabel}
        />
      </FormControl>
      <TextField
        variant={"outlined"}
        label={confirmPasswordLabel}
        type={showPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
      />
    </Box>
  );
};
