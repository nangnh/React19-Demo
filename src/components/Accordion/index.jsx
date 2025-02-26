import { useEffect, useState } from "react";
import AccordionHeader from "./header";
import './styles.css';

const Accordion = ({ id, onHeaderRender, children }) => {
  const [expaned, setExpaned] = useState(false);

  useEffect(() => {
    setExpaned(false);
  }, [])

  return (
    <div id={id} className="accordion">
      <AccordionHeader  expaned={expaned} setExpaned={setExpaned}>
        {onHeaderRender()}
      </AccordionHeader>
      {expaned && <div className="accordion__body">{ children }</div>}
    </div>
  );
};

export default Accordion;