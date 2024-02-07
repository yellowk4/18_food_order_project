import React, { useContext } from 'react';
import Modal from './UI/Modal';
import Input from './UI/Input';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import { currencyFormatter } from '../util/formatting';
import UserProgressContext from '../store/UserProgressContext';

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce((total, item) => total + item.price * item.quantity, 0);

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  // form 요소의 submit 이벤트를 처리하는 함수
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target); // form 요소의 데이터를 FormData 객체로 가져옴
    const customerData = Object.fromEntries(formData.entries()); // FormData 객체를 plain object로 변환

    fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    });
  }

  return (
    <Modal open={userProgressCtx.process === 'checkout'} onClose={handleCloseCheckout}>
      <form onSubmit={handleSubmit}>
        <h2>결제</h2>
        <p>최종 금액: {currencyFormatter.format(cartTotal)}</p>

        <Input label="이름" type="text" id="name" />
        <Input label="이메일" type="email" id="email" />
        <Input label="주소" type="text" id="address" />

        <div className="control-row">
          <Input label="우편번호" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleCloseCheckout}>
            취소
          </Button>
          <Button>결제하기</Button>
        </p>
      </form>
    </Modal>
  );
}
