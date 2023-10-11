import React from "react";

function SliderInput({
  title,
  state,
  min,
  max,
  onChange,
  labelMin,
  labelMax,
  underlineTitle,
}) {
  return (
    <React.Fragment>
      <span className="title">{title}</span>
      {state > 0 && (
        <span className="title" style={{ textDecoration: "underline" }}>
          {underlineTitle}
        </span>
      )}
      <div>
        <input
          type="range"
          min={min}
          max={max}
          className="slider"
          value={state}
          onChange={onChange}
        />

        <div className="labels">
          <label htmlFor="">{labelMin ?? Number(min).toFixed(0)}</label>
          <b>&#8377; {state ? state : 0}</b>
          <label htmlFor="">{labelMax ?? Number(max).toFixed(0)}</label>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SliderInput;
