import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { AdminHeader } from "../../../component/header/admin/AdminHeader";
import { Spinner } from "../../../component/Spinner";
import { axios } from "../../../util/AxiosInterceptor";
import { BACKEND_URL } from "../../../constant/environment";
import { SUPPORT_SUPPORT_REQUEST_API } from "../../../constant/api";
import { AxiosResponse } from "axios";
import { SupportResponseResponse } from "../../../dto/response/admin/support/SupportResponseResponse";
import { UnassignedSupportRequestsTable } from "../../../component/support/UnassignedSupportRequestsTable";
import { AssignedForMeSupportRequestsTable } from "../../../component/support/AssignedForMeSupportRequestsTable";
import { AdminContext } from "../../../util/AdminContext";
import { ClosedSupportRequestsTable } from "../../../component/support/ClosedSupportRequestsTable";
import { OtherSupportRequestsTable } from "../../../component/support/OtherSupportRequestsTable";

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
        data={supportRequests.filter((r) => r.adminEmail === null)}
        update={getSupportRequests}
      />
      <br />
      <AssignedForMeSupportRequestsTable
        data={supportRequests
          .filter((r) => r.adminEmail === adminContext.admin?.email)
          .filter((r) => !r.closed)}
        update={getSupportRequests}
      />
      <br />
      <ClosedSupportRequestsTable
        data={supportRequests.filter((r) => r.closed)}
        update={getSupportRequests}
      />
      <br />
      <OtherSupportRequestsTable
        data={supportRequests
          .filter((r) => r.adminEmail !== adminContext.admin?.email)
          .filter((r) => !r.closed)}
        update={getSupportRequests}
      />
    </Container>
  );
};
