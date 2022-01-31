/*
  @PostMapping("/client/register")
  public JwtResponse register(@RequestBody ClientRegistrationRequest request) {
  }

  @PostMapping("/client/login")
  public JwtResponse generateToken(@RequestBody ClientLoginRequest request) {
  }

  @PostMapping("/client/confirm-email")
  public void confirmEmail(@RequestBody ClientEmailConfirmRequest request) {
  }

  @GetMapping("/client/get-current-client")
  public ClientInfoResponse getCurrentClient() {
  }
;*/
import { usePost } from "./template/usePost";
import { BACKEND_URL } from "../constant/environment";
import { clientRegister } from "../constant/api";
import { JwtResponse } from "../dto/response/JwtResponse";
import { ClientRegistrationRequest } from "../dto/request/ClientRegistrationRequest";

export const usePostRegisterClient = () => {
  usePost<ClientRegistrationRequest, JwtResponse>(BACKEND_URL + clientRegister);
};
