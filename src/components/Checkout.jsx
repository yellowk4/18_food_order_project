import React, { useContext } from 'react';
import Modal from './UI/Modal';
import Input from './UI/Input';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import { currencyFormatter } from '../util/formatting';
import UserProgressContext from '../store/UserProgressContext';
import useHttp from '../hooks/useHttp';
import Error from './Error';

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  // mode: 'no-cors', // CORS 에러를 방지하기 위해 no-cors 모드로 설정
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp('http://localhost:3000/orders', requestConfig);

  const cartTotal = cartCtx.items.reduce((total, item) => total + item.price * item.quantity, 0);

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  // form 요소의 submit 이벤트를 처리하는 함수
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target); // form 요소의 데이터를 FormData 객체로 가져옴
    const customerData = Object.fromEntries(formData.entries()); // FormData 객체를 plain object로 변환

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );

    // 아래 코드는 useHttp 커스텀 훅을 사용하여 대체되었으므로 주석 처리
    // fetch('http://localhost:3000/orders', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     order: {
    //       items: cartCtx.items,
    //       customer: customerData,
    //     },
    //   }),
    // });
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleCloseCheckout}>
        취소
      </Button>
      <Button>결제하기</Button>
    </>
  );

  if (isSending) {
    actions = <span>주문 데이터 보내는중...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={userProgressCtx.process === 'checkout'} onClose={handleFinish}>
        <h2>주문 완료</h2>
        <p>주문이 정상적으로 이루어졌습니다.</p>
        <p>주문에 대한 상세 내용을 이메일로 보내드리겠습니다.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>확인</Button>
        </p>
      </Modal>
    );
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

        {error && <Error title="주문 전송 실패" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
