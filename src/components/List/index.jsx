import { useEffect, useState } from "react";
import Accordion from "../Accordion";
import CheckboxInput from "../Checkbox";
import AccordionItem from "../Accordion/item";

const List = ({ data, onHandleGroupChange }) => {
  const [indeterminate, setIndeterminate] = useState(false);

  const inputJson = JSON.stringify(data)
  useEffect(() => {
    const input = JSON.parse(inputJson)
    const isIndeterminate = getIndeterminate(input)
    setIndeterminate(isIndeterminate);
  }, [inputJson]);

  const getIndeterminate = (group) => {
    return !group.checked && group.items.some((item) => item.checked)
  }

  const updateChecked = (items, checked) => {
    return items.map(item => ({
      ...item,
      checked,
      items: item.items ? updateChecked(item.items, checked) : []
    }));
  };

  const handleChangle = (value) => {
    let newGroups = data;
    newGroups.checked = value;
    newGroups.items = updateChecked(newGroups.items, value);
    onHandleGroupChange(newGroups);
  }

  const handleItemChange = (itemId, checked) => {
    let newGroups = data
    newGroups.items = newGroups.items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          checked,
        }
      }
      return item;
    });
    // verify group value checkbox
    const allItemChecked = newGroups.items.every((item) => item.checked)
    newGroups.checked = !checked ? false : allItemChecked ? allItemChecked : newGroups.checked;
    onHandleGroupChange(newGroups);
  }

  const handleGroupChange = (newData) => {
    const payload = {
      ...data,
      ...newData,
    }
    if (payload?.items?.length) {
      payload.checked = payload.items.every((item) => item.checked)
    }
    console.log('>a', payload)
    onHandleGroupChange(payload)
  }

  const getHeaderRender = () => {
    return (
      <>
        <CheckboxInput
          id={`checkbox_${data.id}`}
          checked={data.checked}
          isIndeterminate={indeterminate}
          onChange={handleChangle}
        />
        <label>{data.title}</label>
      </>
    )
  }

  const generateAccordionDetails = (group) => {
    if (group?.items?.length) {
      return <List key={group.id} data={group} onHandleGroupChange={handleGroupChange}></List>
    }

    return (<AccordionItem
      key={group.id}
      id={group.id}
      title={group.title}
      checked={group.checked}
      onChange={(value) => handleItemChange(group.id, value)}
    />)
  }

  return (
    <Accordion
      id={data.id}
      onHeaderRender={getHeaderRender}
    >
      {data?.items?.length && data.items.map((item) => generateAccordionDetails(item))}
    </Accordion>
  )
};

export default List