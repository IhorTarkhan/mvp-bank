import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { AdminHeader } from "../../../component/header/admin/AdminHeader";
import { AdminContext } from "../../../util/AdminContext";
import { Spinner } from "../../../component/Spinner";
import { axios } from "../../../util/AxiosInterceptor";
import { BACKEND_URL } from "../../../constant/environment";
import {
  SUPPORT_SUPPORT_REQUEST_API,
  SUPPORT_SUPPORT_REQUEST_CANCEL_API,
} from "../../../constant/api";
import { AxiosResponse } from "axios";
import { SupportResponseResponse } from "../../../dto/response/admin/support/SupportResponseResponse";
import { UnassignedSupportRequestsTable } from "../../../component/support/UnassignedSupportRequestsTable";

export const RequestSupportScreen = (): ReactElement => {
  const adminContext = useContext(AdminContext);
  const [supportRequests, setSupportRequests] = useState<
    SupportResponseResponse[] | null
  >(null);

  const getSupportRequests = () => {
    axios
      .get(BACKEND_URL + SUPPORT_SUPPORT_REQUEST_API)
      .then((response: AxiosResponse<SupportResponseResponse[]>) => {
        setSupportRequests(response.data);
      })
      .catch((e: any) => {
        console.error(e);
      });
  };

  const cancelSupportRequests = (id: number) => {
    axios
      .put(BACKEND_URL + SUPPORT_SUPPORT_REQUEST_CANCEL_API + "/" + id)
      .then(() => {
        getSupportRequests();
      })
      .catch((e: any) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getSupportRequests();
    setInterval(getSupportRequests, 10_000);
  }, []);

  if (adminContext.isLoading || !adminContext.admin) {
    return <Spinner />;
  }
  if (supportRequests === null) {
    return <Spinner />;
  }

  return (
    <Container>
      <AdminHeader />
      <Typography variant={"h4"}>Request of support</Typography>
      <br />
      <UnassignedSupportRequestsTable
        allRequests={supportRequests}
        update={getSupportRequests}
      />
    </Container>
  );
};
