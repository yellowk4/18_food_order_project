import React, { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0); // 0 초기값, reduce 함수 => 배열의 총 합을 구할 때 사용

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="식당" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        {/* <button>Cart (0)</button> */}
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalCartItems})
        </Button>
        {/* textOnly={true} prop을 사용하여 버튼 스타일을 변경 */}
      </nav>
    </header>
  );
}
