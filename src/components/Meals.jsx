import React from 'react';
// import React, { useState, useEffect } from 'react';
import MealItem from './MealItem';
import useHttp from '../hooks/useHttp';
import Error from './Error';

const requestConfig = {}; // 빈 객체를 사용하여 기본값을 설정

export default function Meals() {
  // fetchMeals 함수를 어디서든 호출하도록 설정해야 하며, loadedMeals 상태를 사용하여 실제 식사 데이터를 렌더링해야 합니다.
  // fetchMeals 함수는 useEffect 훅을 사용하여 컴포넌트가 렌더링될 때 한 번 호출되도록 설정해야 합니다.

  // useHttp 커스텀 훅을 사용으로 아래 주석 처리
  // const [loadedMeals, setloadedMeals] = useState([]);

  // useEffect(() => {
  //   async function fetchMeals() {
  //     const response = await fetch('http://localhost:3000/meals'); //{method: 'GET'} is the default

  //     if (!response.ok) {
  //       // ...
  //     }

  //     const meals = await response.json();
  //     setloadedMeals(meals);
  //   }

  //   fetchMeals(); // fetchMeals 함수를 호출
  // }, []);

  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp('http://localhost:3000/meals', requestConfig, []);

  // console.log('loadedMeals', loadedMeals);

  if (isLoading) {
    return <p className="center">메뉴 가져오는 중...</p>;
  }

  if (error) {
    return <Error title="메뉴를 가져오는 중 오류 발생" message={error} />;
  }

  // if (!data) {
  //   return <p>음식 메뉴를 찾지 못함</p>;
  // }

  return (
    <ul id="meals">
      {/* loadedMeals 데이터는 초기에 정의되지 않으므로, map 메서드를 사용하여 렌더링할 수 없습니다. */}
      {loadedMeals.map((meal) => (
        // <li key={meal.id}>{meal.name}</li>
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
