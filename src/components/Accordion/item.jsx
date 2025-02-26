import CheckboxInput from "../Checkbox";

const AccordionItem = ({ id, title, checked, onChange }) => {
  return (
    <div className="accordion__item">
      <CheckboxInput id={id} checked={checked} onChange={onChange} />
      <label htmlFor={id}>{title}</label>
    </div>
  );
};

export default AccordionItem