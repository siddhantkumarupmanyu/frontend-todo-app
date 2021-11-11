import {Checkbox, MaterialIconButton} from "../base_components/BaseComponents";
import {AnimatedList} from "../base_components/AnimatedList";
import './TodoList.scss';

export function TodoList({todoItems, onItemClick, onItemDelete}) {
    return (
        <div className="todo-list">
            <AnimatedList
                timeout={{
                    enter: 0,
                    exit: 1000,
                }}
                items={todoItems}
                ListItem={TodoListItem}
                listItemKey={(todoItem, index) => todoItem.getId()}
                listItemProp={(todoItem, index) => ({
                    item: todoItem,
                    onCheck: () => onItemClick(todoItem, index),
                    onDelete: () => onItemDelete(todoItem, index)
                })}
            />
        </div>
    )
}

function TodoListItem({item, onCheck, onDelete, state}) {
    let strikeThrough = "none"
    if (item.isDone()) {
        strikeThrough = "line-through"
    }
    return (
        <li className={`todo-item todo-item-${state}`}>
            <span className="note-text" style={{textDecoration: strikeThrough}}>{item.getNote()}</span>
            <Checkbox isChecked={item.isDone()} onClick={onCheck}/>
            <MaterialIconButton iconName="delete" onClick={onDelete}/>
        </li>
    );
}