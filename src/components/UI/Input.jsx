import React from 'react';
import PropTypes from 'prop-types'; // prop-types 라이브러리를 사용하여 컴포넌트의 props에 대한 타입을 검사

export default function Input({ label, id, ...props }) {
  return (
    <p className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} required {...props} />
    </p>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
