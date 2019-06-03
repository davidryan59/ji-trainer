import React from 'react'


const Button = ({ id, label, charCodeArray=[], onClick, disabled, inlineStyles }) => (
  <button
    id={id}
    onClick={onClick}
    disabled={disabled}
    className={(disabled) ? 'ButtonDisabled' : 'ButtonEnabled'}
    style={inlineStyles}
  >
    {label}
    {charCodeArray.map(charCode => String.fromCharCode(charCode))}
  </button>
)

export default Button
