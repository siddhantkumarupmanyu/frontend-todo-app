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
                    item: todoItem,
                    onCheck: () => onItemClick(todoItem, index),
                    onDelete: () => onItemDelete(todoItem, index)
                })}
            />
        </div>
    )
}

function TodoListItem({item, onCheck, onDelete}) {
    let strikeThrough = "none"
    if (item.isDone()) {
        strikeThrough = "line-through"
    }
    return (
        <li className="todo-item">
            <span className="note-text" style={{textDecoration: strikeThrough}}>{item.getNote()}</span>
            <Checkbox isChecked={item.isDone()} onClick={onCheck}/>
            <MaterialIconButton iconName="delete" onClick={onDelete}/>
        </li>
    );
}