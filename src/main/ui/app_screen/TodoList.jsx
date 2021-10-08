import {Checkbox, List, MaterialIconButton} from "../base_components/BaseComponents";
import './TodoList.scss';
import {useEffect, useRef, useState} from "react";

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

function getTodoItemStatus(newItems, oldItems) {
    const status = new Map()

    if (newItems.length < oldItems.length) { // removal
        for (let i = 0; i < oldItems.length; i++) {
            // if ((newItems[i] === undefined) || (!newItems[i].equals(oldItems[i]))) {
            //     status.set(i, "remove")
            // }
            if ((newItems[i] === undefined) || (!newItems[i].equals(oldItems[i]))) {
                status.set(i, "remove")
                break
            }
        }
    } else if (newItems.length > oldItems.length) { // addition
        status.set(oldItems.length, "add")
    }

    return status
}

function getMergedList(newItems, oldItems) {
    let merged = []
    if (newItems.length < oldItems.length) { // removal
        merged = Array.from(oldItems)
    } else if (newItems.length > oldItems.length) { // addition
        merged = Array.from(newItems)
    }
    return merged
}


// todo: should try to create a array diff algorithm in some utils class
//  - and calculate the time it takes
