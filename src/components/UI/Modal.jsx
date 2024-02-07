import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom'; // createPortal 함수를 사용하여 모달을 렌더링

// export default function Modal(children, open, className = '') {
export default function Modal({ children, open, onClose, className = '' }) {
  // 객체 형태로 받아야 함

  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current; // dialog.current => ref 객체의 current 속성
    if (open) modal.showModal(); // showModal 메서드 => 내장 객체
    return () => modal.close(); // useEffect Hook은 선택적으로 정리(cleanup) 함수를 반환할 수 있습니다. 이 함수는 컴포넌트가 unmount되거나, 다음 useEffect가 실행되기 전에 호출됩니다. 여기서는 모달을 닫는 close 메서드를 호출하는 함수를 반환하고 있습니다. 이로써 open prop이 false로 변경되거나 컴포넌트가 unmount될 때 모달이 닫히게 됩니다.
  }, [open]);

  return createPortal(
    // modal 버그 - 창을 Esc 키로 닫으면 open 속성값이 변하지 않았고 그대로 이다.

    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}
