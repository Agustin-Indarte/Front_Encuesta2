import React from 'react';
import styled from 'styled-components';

const Switch = ({
  checked = false,
  onChange = () => {},
  disabled = false,
  labels = { on: 'ACTIVA', off: 'INACTIVA' }
}) => {
  const handleClick = (e) => {
    e.stopPropagation();
  };
  const handleChange = (e) => {
    onChange(e.target.checked);
  };
  return (
    <StyledWrapper onClick={handleClick}>
      <label className={`switch ${disabled ? 'is-disabled' : ''}`}>
        <input
          type="checkbox"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
        />
        <span className="slider" data-on={labels.on} data-off={labels.off} />
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .switch { position: relative; display: inline-block; width: 120px; height: 34px; }
  .switch input { display: none; }
  .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #3C3C3C; transition: .4s; border-radius: 34px; }
  .slider:before { position: absolute; content: ""; height: 26px; width: 26px; left: 4px; bottom: 4px; background-color: white; transition: .4s; border-radius: 50%; }
  input:checked + .slider { background-color: #0E6EB8; }
  input:focus + .slider { box-shadow: 0 0 1px #2196F3; }
  input:checked + .slider:before { transform: translateX(85px); }
  .slider:after { content: attr(data-off); color: white; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 10px; font-family: Verdana, sans-serif; }
  input:checked + .slider:after { content: attr(data-on); }
  .is-disabled .slider { opacity: .5; cursor: not-allowed; }
`;

export default Switch;
