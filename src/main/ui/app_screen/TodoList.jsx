import {Checkbox, List, MaterialIconButton} from "../base_components/BaseComponents";
import './TodoList.scss';
import {useEffect, useRef, useState} from "react";
import {getListDiff} from "../ui_utils/ListDiff";

export function TodoList({todoItems, onItemClick, onItemDelete}) {

    // let [items, setItems] = useState(todoItems)
    //
    // useEffect(() => {
    //     setItems(todoItems)
    // }, [todoItems])

    // we can optimize this further with https://reactjs.org/docs/hooks-faq.html#how-to-memoize-calculations

    // let items = useRef([])

    // todo: program is crashing when we flip the item status
    //  - we can do two things here
    //    - we can make equal here compare only ids; i.e. item1.getId() === item2.getId()
    //    - second we can make sure we only diff when the length of oldItems is different than newList
    //      - this way we make sure we never waste time diffing when there is no addition or removal
    //      - for this case we do not care about if item is changed internally
    //  - since I am not sure if react can postpone rendering; in case when react does it and
    //    newList contains both changed items and added or removed items
    //    we should therefore use both the above solutions
    //  - one last thing; make test before writing any code; I know i am following TDD; but still
    //    sometimes it's better to just remind oneself. :)

    // todo: lets get a visual spike first of animation
    //  - this is visual thing; can only be tested manually

    let [items, setItems] = useState([])

    const diffedList = getListDiff(items, todoItems, (item1, item2) => item1.equals(item2))

    // will run on all renders
    // if want only on componentDidMount or once then pass [] i.e. empty array as dependency
    // useEffect(() => {
    //     items.current = todoItems
    // })

    useEffect(() => {
        setTimeout(() => {
            // todo: fix first item not showing animation
            //  - write a test confirming the bug first
            //  - remove Array.from line to reproduce the bug
            setItems(Array.from(todoItems))
        }, 50)
    }, [todoItems])

    return (
        <div className="todo-list">
            <List
                items={diffedList}
                ListItem={TodoListItem}
                listItemProp={(diffedListItem, index) => ({
                    key: diffedListItem.item.getId(),
                    diffedListItem: diffedListItem,
                    onCheck: () => onItemClick(diffedListItem.item, index),
                    onDelete: () => onItemDelete(diffedListItem.item, index)
                })}
            />
        </div>
    )
}

function TodoListItem({diffedListItem, onCheck, onDelete,}) {


    let statusClasses = ""
    const diff = diffedListItem.diff;

    if (diff !== undefined) {
        if (diff === "remove") {
            statusClasses = "remove"
        } else if (diff === "add") {
            statusClasses = "add"
        }
    }

    let todoItem = diffedListItem.item

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