import React, { useEffect, useState, useCallback } from 'react';

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json(); // json() 메서드를 사용하여 응답 데이터를 JavaScript 객체로 변환

  if (!response.ok) {
    throw new Error(resData.message || 'Request failed!');
  }

  return resData;
}

export default function useHttp(url, config) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async function sendRequest() {
      setIsLoading(true);
      try {
        const resData = sendHttpRequest(url, config);
        setData(resData);
      } catch (error) {
        setError(error.message || 'Something went wrong!');
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  return {
    isLoading,
    data,
    error,
    sendRequest,
  };
}
