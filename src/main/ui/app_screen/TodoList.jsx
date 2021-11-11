import {Checkbox, List, MaterialIconButton} from "../base_components/BaseComponents";
import './TodoList.scss';
import {Transition, TransitionGroup} from "react-transition-group";

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
            {/*<List*/}
            {/*    items={todoItems}*/}
            {/*    ListItem={TodoListItem}*/}
            {/*    listItemProp={(todoItem, index) => ({*/}
            {/*        key: todoItem.getId(),*/}
            {/*        item: todoItem,*/}
            {/*        onCheck: () => onItemClick(todoItem, index),*/}
            {/*        onDelete: () => onItemDelete(todoItem, index)*/}
            {/*    })}*/}
            {/*/>*/}
        </div>
    )
}

function TodoListItem({item, onCheck, onDelete, state}) {
    let strikeThrough = "none"
    if (item.isDone()) {
        strikeThrough = "line-through"
    }
    return (
        <li className={`todo-item ${state}`}>
            <span className="note-text" style={{textDecoration: strikeThrough}}>{item.getNote()}</span>
            <Checkbox isChecked={item.isDone()} onClick={onCheck}/>
            <MaterialIconButton iconName="delete" onClick={onDelete}/>
        </li>
    );
}

// todo: check if other way is also possible that is,
//  using component={List} in TransitionGroup
function AnimatedList({items, timeout, ListItem, listItemKey, listItemProp}) {

    // todo: change class name to animated-list
    return (
        <ul className="list">
            <TransitionGroup component={null}>{
                items.map((item, index) => (
                    <Transition key={listItemKey(item, index)} timeout={timeout}>{(state) => (
                        <ListItem
                            state={state}
                            {...listItemProp(item, index)}
                        />
                    )}</Transition>
                ))
            }</TransitionGroup>
        </ul>
    )
}