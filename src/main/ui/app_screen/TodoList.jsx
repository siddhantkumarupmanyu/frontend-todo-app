import {Checkbox, List, MaterialIconButton} from "../base_components/BaseComponents";
import './TodoList.scss';
import {Transition, TransitionGroup} from "react-transition-group";

export function TodoList({todoItems, onItemClick, onItemDelete}) {

    // todo: check other way is also possible that is,
    //  using component={List} in TransitionGroup

    return (
        <div className="todo-list">
            <ul className="list">
                {/*<TransitionGroup component={null}>*/}
                {/*    {*/}
                {/*        todoItems.map((item, index) => (*/}
                {/*            <Transition key={item.getId()} timeout={0}>*/}
                {/*                {(state) => (*/}
                {/*                    <TodoListItem item={item}/>*/}
                {/*                )*/}
                {/*                }*/}
                {/*            </Transition>*/}
                {/*        ))*/}
                {/*    }*/}
                {/*</TransitionGroup>*/}
                {
                    todoItems.map((item, index) => (
                        <TodoListItem key={item.getId()} item={item}/>
                    ))
                }
            </ul>
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