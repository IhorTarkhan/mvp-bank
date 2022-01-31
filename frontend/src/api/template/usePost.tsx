import { useEffect, useState } from "react";
import axios from "axios";
import { ErrorResponse } from "./ErrorResponse";

export const usePost = <T_TYPE, RESPONSE_TYPE>(
  requestUrl?: string
): [
  (data: T_TYPE, url?: string) => void,
  RESPONSE_TYPE | undefined,
  boolean | undefined,
  ErrorResponse | undefined
] => {
  const [url, setUrl] = useState<string | undefined>(requestUrl);
  const [postingData, setPostingData] = useState<T_TYPE>();
  const [responseData, setResponseData] = useState<RESPONSE_TYPE>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<ErrorResponse>();

  useEffect(() => {
    setUrl(requestUrl);
  }, [requestUrl]);

  useEffect(() => {
    if (!url) return;
    if (!postingData) return;
    (async () => {
      setIsLoading(true);
      try {
        const response = (await axios.post(url, postingData)).data;
        setResponseData(response);
      } catch (error) {
        const e = error as { response: { status: number; data: string } };
        console.error(e);
        setError({ status: e.response.status, message: e.response?.data });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [url, postingData]);

  return [
    (data: T_TYPE, url?: string) => {
      url && setUrl(url);
      setPostingData(data);
    },
    responseData,
    isLoading,
    error,
  ];
};
