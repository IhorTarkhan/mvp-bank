import { useEffect, useState } from "react";
import axios from "axios";
import { ErrorResponse } from "./ErrorResponse";

export const useGet = <RESPONSE_TYPE,>(
  requestUrl?: string
): [
  (url?: string) => void,
  RESPONSE_TYPE | undefined,
  boolean | undefined,
  ErrorResponse | undefined
] => {
  const [url, setUrl] = useState<string | undefined>(requestUrl);
  const [responseData, setResponseData] = useState<RESPONSE_TYPE>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<ErrorResponse>();
  const [update, setUpdate] = useState<any>({});

  useEffect(() => {
    setUrl(requestUrl);
  }, [requestUrl]);

  useEffect(() => {
    if (!url) return;
    (async () => {
      setIsLoading(true);
      try {
        const resp = (await axios.get(url)).data;
        setResponseData(resp);
      } catch (error) {
        const e = error as { response: { status: number; data: string } };
        console.error(e);
        setError({ status: e.response.status, message: e.response?.data });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [url, update]);

  return [
    (url?: string) => {
      url && setUrl(url);
      setUpdate({});
    },
    responseData,
    isLoading,
    error,
  ];
};
