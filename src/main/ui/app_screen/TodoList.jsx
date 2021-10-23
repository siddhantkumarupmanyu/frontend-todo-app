import {Checkbox, List, MaterialIconButton} from "../base_components/BaseComponents";
import './TodoList.scss';
import {useRef} from "react";

export function TodoList({todoItems, onItemClick, onItemDelete}) {

    // let [items, setItems] = useState(todoItems)
    //
    // useEffect(() => {
    //     setItems(todoItems)
    // }, [todoItems])

    // we can optimize this further with https://reactjs.org/docs/hooks-faq.html#how-to-memoize-calculations

    let items = useRef(todoItems)
    let itemsStatus = getTodoItemStatus(todoItems, items.current)

    let mergedList = getMergedList(todoItems, items.current)

    items.current = todoItems

    return (
        <div className="todo-list">
            <List
                items={mergedList}
                ListItem={TodoListItem}
                listItemProp={(todoItem, index) => ({
                    key: todoItem.getId(),
                    todoItem: todoItem,
                    status: itemsStatus.get(index),
                    onCheck: () => onItemClick(todoItem, index),
                    onDelete: () => onItemDelete(todoItem, index)
                })}
            />
        </div>
    )
}

function TodoListItem({todoItem, status, onCheck, onDelete,}) {

    let statusClasses = ""
    if (status !== undefined) {
        if (status === "remove") {
            statusClasses = "remove"
        } else if (status === "add") {
            statusClasses = "add"
        }
    }

    let strikeThrough = "none"
    if (todoItem.isDone()) {
        strikeThrough = "line-through"
    }

    return (
        <li className={`todo-item ${statusClasses}`}>
            <span className="note-text" style={{textDecoration: strikeThrough}}>{todoItem.getNote()}</span>
            <Checkbox isChecked={todoItem.isDone()} onClick={onCheck}/>
            <MaterialIconButton iconName="delete" onClick={onDelete}/>
        </li>
    );
}
