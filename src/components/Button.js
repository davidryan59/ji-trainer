import React from 'react'

const Button = ({ id, label, charCode, onClick }) => (
  <button
    id={id}
    onClick={onClick}
  >
    {label}
    {String.fromCharCode(charCode)}
  </button>
)

export default Button
