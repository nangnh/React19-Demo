const AccordionHeader = ({ children, expaned, setExpaned }) => {

  return (
    <button className="accordion__header" onClick={() =>setExpaned(!expaned)}>
      <div className="accordion__title">
        <span>{expaned ? '\u2193' : '\u2192'}</span>
        {children}
      </div>
    </button>
  )
};

export default AccordionHeader;