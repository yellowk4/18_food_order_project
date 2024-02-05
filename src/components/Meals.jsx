import React, { useState, useEffect } from 'react';
import MealItem from './MealItem';

export default function Meals() {
  // fetchMeals 함수를 어디서든 호출하도록 설정해야 하며, loadedMeals 상태를 사용하여 실제 식사 데이터를 렌더링해야 합니다.
  // fetchMeals 함수는 useEffect 훅을 사용하여 컴포넌트가 렌더링될 때 한 번 호출되도록 설정해야 합니다.

  const [loadedMeals, setloadedMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch('http://localhost:3000/meals'); //{method: 'GET'} is the default

      if (!response.ok) {
        // ...
      }

      const meals = await response.json();
      setloadedMeals(meals);
    }

    fetchMeals(); // fetchMeals 함수를 호출
  }, []);

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        // <li key={meal.id}>{meal.name}</li>
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
