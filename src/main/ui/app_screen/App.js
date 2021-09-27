import {useEffect, useReducer} from "react";
import './App.scss'
import {AddItem} from "./AddItem";
import {TodoList} from "./TodoList";
import TodoItem from "./TodoItem";
import * as Utils from "../ui_utils/utils";

const initialState = {
    todoItems: [
        new TodoItem("note1", false),
        new TodoItem("note2", true)
    ],
}

function reducer(state, action) {
    switch (action.type) {
        case "add-item":
            return {
                ...state,
                todoItems: state.todoItems.concat([new TodoItem(action.text, false)]),
            }
        case "item-click":
            const newArray = Array.from(state.todoItems)
            newArray[action.index] = newArray[action.index].flipStatus()
            return {
                ...state,
                todoItems: newArray
            }
        default:
            throw new Error()
    }
}


export default function App() {

    const [appState, appDispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        Utils.setRGBVars()
    }, [])

    function addItem(text) {
        appDispatch({type: "add-item", text: text})
        // return true if save is successful
        return true
    }

    return (
        <div className="app">
            <AddItem onSave={addItem}/>
            <TodoList todoItems={appState.todoItems}
                      onItemClick={(todoItem, index) => appDispatch({
                          type: "item-click",
                          todoItem: todoItem,
                          index: index
                      })}/>
        </div>
    );
}