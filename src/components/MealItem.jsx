import React, { useContext } from 'react';
import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';
import CartContext from '../store/CartContext'; // CartContext는 객체이므로 중괄호로 감싸지 않아야 합니다.

export default function MealItem({ meal }) {
  // meal prop을 사용하여 식사 데이터를 렌더링해야 합니다.

  const cartCtx = useContext(CartContext);

  function handleAddMealToCart() {
    cartCtx.addItem(meal);
  }

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
          <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
