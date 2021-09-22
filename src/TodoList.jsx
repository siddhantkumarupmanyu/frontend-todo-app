import {Checkbox, List} from "./BaseComponents";
import './TodoList.scss';

export function TodoList() {

    const items = ["item 1", "item 2"]

    return (
        <div className="todo-list">
            <List
                items={items}
                ListItem={TodoItem}
                listItemProp={(item, index) => ({
                    key: item,
                    text: item,
                    // onCheck: () => alert(`checked ${index}`)
                })}
            />
        </div>
    )
}

function TodoItem({text, onCheck}) {
    return (
        <li className="todo-item">
            <span>{text}</span>
            <Checkbox/>
        </li>
    );
}

