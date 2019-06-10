import React from 'react'


const Picklist = obj => (
  <span style={{textAlign: 'center', margin: '2px 10px'}}>
    <label>
      {obj.picklist.label}
    </label>
    &nbsp;&nbsp;
    <select
      value = {obj.picklist.value}
      onChange = {obj.valueChange}
    >
      { obj.picklist.values.map( pv => <option key={pv}>{pv}</option> ) }
    </select>
  </span>
)

export default Picklist
