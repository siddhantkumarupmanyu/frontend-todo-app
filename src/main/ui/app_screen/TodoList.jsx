import {Checkbox, List, MaterialIconButton} from "../base_components/BaseComponents";
import './TodoList.scss';

export function TodoList({todoItems, onItemClick, onItemDelete}) {

    return (
        <div className="todo-list">
            <List
                items={todoItems}
                ListItem={TodoListItem}
                listItemProp={(todoItem, index) => ({
                    key: todoItem.getId(),
                    todoItem: todoItem,
                    onCheck: () => onItemClick(todoItem, index),
                    onDelete: () => onItemDelete(todoItem, index)
                })}
            />
        </div>
    )
}

function TodoListItem({todoItem, onCheck, onDelete}) {

    let strikeThrough = "none"
    if (todoItem.isDone()) {
        strikeThrough = "line-through"
    }

    return (
        <li className="todo-item">
            <span className="note-text" style={{textDecoration: strikeThrough}}>{todoItem.getNote()}</span>
            <Checkbox isChecked={todoItem.isDone()} onClick={onCheck}/>
            <MaterialIconButton iconName="delete" onClick={onDelete}/>
        </li>
    );
}

