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
                        items[index].setDone(!items[index].isDone())
                        setItems([...items])
                    }
                })}
            />
        </div>
    )
}

function TodoListItem({todoItem, onCheck}) {

    let strikeThrough = "none"
    if (todoItem.isDone()) {
        strikeThrough = "line-through"
    }

    return (
        <li className="todo-item">
            <span style={{textDecoration: strikeThrough}}>{todoItem.getNote()}</span>
            <Checkbox isChecked={todoItem.isDone()} onClick={onCheck}/>
        </li>
    );
}

