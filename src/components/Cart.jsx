import React, { useContext } from 'react';
import Button from './UI/Button';
import Modal from './UI/Modal';
import CartContext from '../store/CartContext';
import { currencyFormatter } from '../util/formatting';
import UserProgressContext from '../store/UserProgressContext';
import CartItem from './CartItem';

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce((total, item) => total + item.price * item.quantity, 0);

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.process === 'cart'}
      onClose={userProgressCtx.process === 'cart' ? handleCloseCart : null}
    >
      <h2>나의 장바구니</h2>
      <ul>
        {cartCtx.items.map((item) => (
          // <li key={item.id}>
          //   {item.name} - {item.quantity}
          // </li>
          <CartItem
            key={item.id}
            {...item}
            onIncrease={() => cartCtx.addItem(item)} //
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && <Button onClick={handleGoToCheckout}>Go to Checkout</Button>}
      </p>
    </Modal>
  );
}
