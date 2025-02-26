import { useState } from 'react';
import './App.css'
import Dropdown from './components/Dropdown';
import List from './components/List';
/**
 * COMPONENTS: Dropdown, accordion, Checkbox(Interdermine), Label
 * Dropdown
 *  - Menu
 *  - Option
 * accordion:
 *  - Header: LeftIcon + Checkbox + Label clickable
 *  - Body: ReactNode
 * Checkbox with Interdermine
 * Label
 * 
 * Data: 
 *   Item: { label, checked }
 *   Group: { label, items: Item[], checked, indeterminate }
 *   Groups: { label, group: Group }
 */
function App() {
  const [groups, setGroups] = useState([
    {
      id: 'user-manager',
      title: 'User Manager',
      checked: false,
      items: [
        { id: 'user-1', title: 'User 1', checked: false },
        { id: 'user-2', title: 'User 2', checked: false },
        { id: 'user-3', title: 'User 3', checked: false },
      ],
    },
    {
      id: 'role-manager',
      title: 'Role Manager',
      checked: false,
      items: [
        { id: 'role-1', title: 'Role 1', checked: false },
        {
          id: 'role-2',
          title: 'Role 2',
          checked: false,
          items: [
            {
              id: 'permission-1',
              title: 'Permission 1',
              checked: false,
              items: [
                {
                  id: 'action 1',
                  title: 'Action 1',
                  checked: false,
                }
              ],
            },
            {
              id: 'permission-2',
              title: 'Permission 2',
              checked: false,
            }
          ]
        },
      ],
    }
  ]);

  const handleGroupChange = (newData) => {
    const newGroups = groups.map((group) => {
      if (group.id === newData.id) {
        const newGroup = {
          ...group,
          ...newData,
        }
        const allItemChecked = newGroup.items.every((item) => item.checked)
        const hasSomeUnChecked = newGroup.items.some((item) => !item.checked)
        newGroup.checked = allItemChecked ? true : hasSomeUnChecked ? false : newGroup.checked;

        return newGroup
      }
      return group;
    });
    setGroups(newGroups);
  }

  return (
    <div>
      <Dropdown id="user-manager" title='Profile Settings'>
        {
          groups.map((group) => 
            <List
              key={group.id}
              data={group}
              onHandleGroupChange={handleGroupChange}
            >
            </List>
        )}
      </Dropdown>
    </div>
  )
}

export default App
