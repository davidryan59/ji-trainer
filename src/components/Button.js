import React from 'react'


const Button = obj => (
  <button
    id={obj.id}
    onClick={obj.onClick}
    disabled={obj.disabled}
    className={obj.disabled ? 'ButtonDisabled' : 'ButtonEnabled'}
    style={obj.inlineStyles}
  >
    {obj.label}
    {
      Array.isArray(obj.charCodeArray)
      ?
      obj.charCodeArray.map(charCode => String.fromCharCode(charCode))
      :
      null
    }
  </button>
)

export default Button
