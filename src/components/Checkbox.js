import React from 'react'


const Checkbox = obj => (
  <label>
    <input
      type="checkbox"
      checked={obj.checkbox.value}
      onChange={obj.checkbox.valueChange}
    />
    {obj.checkbox.label}
  </label>
)

export default Checkbox





// name={obj.checkbox.name}
// 
