import React from 'react'

function TextInput({title, state, setState, max}) {
  return (
    <React.Fragment>
      <span className="title">{title}</span>
        <input
          type="number"
          value={state}
          min={0}
          max={max}
          onChange={(e) => setState(e.target.value)}
          placeholder={title}
        />
    </React.Fragment>
  )
}

export default TextInput