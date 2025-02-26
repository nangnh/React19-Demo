import { useState } from "react";
import './styles.css';

const Dropdown = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown">
      <button onClick={() => setOpen(!open)} className="dropdown__header">
        <div className="dropdown__label">{ title ?? 'Dropdown' }<span>{!open ? '\u25B2' : '\u25BC'}</span></div>
      </button>
      {open && <div className={`dropdown__menu ${open ? 'dropdown__menu--open' : ''}`}>{children}</div>}
    </div>
  );
}

export default Dropdown;