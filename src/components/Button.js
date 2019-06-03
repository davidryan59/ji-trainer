import React from 'react'


const Button = ({ id, label, charCode, onClick, disabled, inlineStyles }) => (
  <button
    id={id}
    onClick={onClick}
    disabled={disabled}
    className={(disabled) ? 'ButtonDisabled' : 'ButtonEnabled'}
    style={inlineStyles}
  >
    {label}
    {String.fromCharCode(charCode)}
  </button>
)

export default Button
