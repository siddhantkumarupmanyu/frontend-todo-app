import {Checkbox, List, MaterialIconButton} from "../base_components/BaseComponents";
import './TodoList.scss';
import {useRef} from "react";
import {getListDiff} from "../ui_utils/ListDiff";

export function TodoList({todoItems, onItemClick, onItemDelete}) {

    // let [items, setItems] = useState(todoItems)
    //
    // useEffect(() => {
    //     setItems(todoItems)
    // }, [todoItems])

    // we can optimize this further with https://reactjs.org/docs/hooks-faq.html#how-to-memoize-calculations

    // should I wrap todoItems(in useRef and item.current) with Array.from()
    // since react and my structure gives me a little bit of trust
    // i am gonna ignore it for now
    let items = useRef(todoItems)

    const diffedList = getListDiff(items.current, todoItems, (item1, item2) => item1.equals(item2))

    items.current = todoItems

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