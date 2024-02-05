import React from 'react';
import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';

export default function MealItem({ meal }) {
  // meal prop을 사용하여 식사 데이터를 렌더링해야 합니다.
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          {/* <button>Add to Cart</button> */}
          <Button>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
