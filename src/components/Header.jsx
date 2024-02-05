import React from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="식당" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        {/* <button>Cart (0)</button> */}
        <Button textOnly>Cart (0)</Button>
        {/* textOnly={true} prop을 사용하여 버튼 스타일을 변경 */}
      </nav>
    </header>
  );
}
