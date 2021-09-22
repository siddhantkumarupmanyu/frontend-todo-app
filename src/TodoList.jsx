import {Checkbox, List} from "./BaseComponents";
import './TodoList.scss';
import TodoItem from "./TodoItem";
import {useState} from "react";

export function TodoList() {

    const [items, setItems] = useState([
        new TodoItem("note1", false),
        new TodoItem("note2", true)
    ])

    return (
        <div className="todo-list">
            <List
                items={items}
                ListItem={TodoListItem}
                listItemProp={(todoItem, index) => ({
                    key: todoItem.getNote(),
                    todoItem: todoItem,
                    onCheck: () => {
                        items[index].setIsDone(!items[index].getIsDone())
                        setItems([...items])
                    }
                })}
            />
        </div>
    )
}

function TodoListItem({todoItem, onCheck}) {
    return (
        <li className="todo-item">
            <span>{todoItem.getNote()}</span>
            <Checkbox isChecked={todoItem.getIsDone()} onClick={onCheck}/>
        </li>
    );
}

