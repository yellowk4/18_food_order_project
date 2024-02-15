import React from 'react';
import { createContext, useReducer } from 'react';

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === 'ADD') {
    // state.items.push(action.item); // push 사용시 state를 직접 수정하게 되어서 안됨
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id); // 이미 있는 아이템인지 확인
    // console.log('existingCartItemIndex', existingCartItemIndex);

    const updatedItems = [...state.items]; // 새로운 배열을 만들어서 수정

    if (existingCartItemIndex > -1) {
      // 이미 있는 아이템이면
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem; // 기존 아이템을 업데이트
    } else {
      // 새로운 아이템 추가
      updatedItems.push({ ...action.item, quantity: 1 }); // 초기 수량은 1
    }

    return { ...state, items: updatedItems }; // state를 업데이트
  }

  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id); //action.item.id => action.id로 변경하는 이유는 removeItem에서 id만 받아오기 때문
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = { ...existingCartItem, quantity: existingCartItem.quantity - 1 };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems }; // state를 업데이트
  }

  if (action.type === 'CLEAR') {
    return { ...state, items: [] };
  }

  return state;
}

export function CartContextProvider({ children }) {
  // useState를 사용 가능
  // useReducer를 사용 => 더 복잡한 상태관리가 필요할 때

  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: 'ADD', item }); //item: item => item으로 축약
  }

  function removeItem(id) {
    dispatchCartAction({ type: 'REMOVE', id }); //id: id => id로 축약
  }

  function clearCart() {
    dispatchCartAction({ type: 'CLEAR' });
  }

  const cartContext = {
    items: cart.items,
    addItem, //addItem: addItem => addItem으로 축약
    removeItem, //removeItem: removeItem => removeItem으로 축약
    clearCart,
  };

  // console.log('cartContext', cartContext);

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
}

export default CartContext;
