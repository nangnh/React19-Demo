import { useEffect, useRef } from 'react';
import './styles.css';

const CheckboxInput = ({ id, checked, onChange, isIndeterminate }) => {
  const inputRef = useRef()
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  const handleClick = (event) => {
    event.stopPropagation();
  }

  return (
    <input
      ref={inputRef}
      id={id}
      checked={checked}
      onClick={handleClick}
      onChange={(event) => onChange(event.target.checked)}
      type="checkbox"
      className="checkbox-wrapper"
    />
  )
}

export default CheckboxInput