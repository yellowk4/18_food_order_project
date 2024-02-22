import { useEffect, useState, useCallback } from 'react';

async function sendHttpRequest(url, config) {
  console.log('Sending request to', url, 'with config', config);
  const response = await fetch(url, config);
  console.log('Received response', response);
  const resData = await response.json();
  console.log('Response data', resData);

  if (!response.ok) {
    throw new Error(resData.message || '요청 실패!');
  }

  return resData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function clearData() {
    setData(initialData);
  }

  // 무한 루프를 방지하기 위해 useCallback 훅을 사용하여 sendRequest 함수를 생성
  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data }); // await 키워드를 사용하여 sendHttpRequest 함수가 반환하는 프로미스를 기다림
        setData(resData); // 응답 데이터를 data 상태에 저장
      } catch (error) {
        setError(error.message || '문제가 발생했습니다.!');
      }
      setIsLoading(false); // 요청이 완료되면 isLoading 상태를 false로 설정
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  // 커스텀 훅을 사용하여 데이터를 가져오는 컴포넌트에서는 isLoading, data, error, sendRequest를 반환해야 합니다.
  return {
    isLoading,
    data,
    error,
    sendRequest,
    clearData,
  };
}
