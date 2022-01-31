import { useEffect, useState } from "react";
import axios from "axios";
import { ErrorResponse } from "./ErrorResponse";

export const usePut = <PUT_TYPE, RESPONSE_TYPE>(
  requestUrl?: string
): [
  (data: PUT_TYPE, url?: string) => void,
  RESPONSE_TYPE | undefined,
  boolean | undefined,
  ErrorResponse | undefined
] => {
  const [url, setUrl] = useState<string | undefined>(requestUrl);
  const [puttingData, setPuttingData] = useState<PUT_TYPE>();
  const [responseData, setResponseData] = useState<RESPONSE_TYPE>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<ErrorResponse>();

  useEffect(() => {
    setUrl(requestUrl);
  }, [requestUrl]);

  useEffect(() => {
    if (!url) return;
    if (!puttingData) return;
    (async () => {
      setIsLoading(true);
      try {
        const response = (await axios.put(url, puttingData)).data;
        setResponseData(response);
      } catch (error) {
        const e = error as { response: { status: number; data: string } };
        console.error(e);
        setError({ status: e.response.status, message: e.response?.data });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [url, puttingData]);

  return [
    (data: PUT_TYPE, url?: string) => {
      url && setUrl(url);
      setPuttingData(data);
    },
    responseData,
    isLoading,
    error,
  ];
};
