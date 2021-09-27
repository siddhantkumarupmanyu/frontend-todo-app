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
    inputText: "",
}

function reducer(state, action) {
    switch (action.type) {
        case "input-text-value-change":
            return {
                ...state,
                inputText: action.value
            }
        case "add-item":
            return {
                ...state,
                todoItems: state.todoItems.concat([new TodoItem(state.inputText, false)]),
                inputText: ""
            }
        case "cancel":
            return {
                ...state,
                inputText: ""
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

    return (
        <div className="app">
            <AddItem
                value={appState.inputText}
                onChange={(e) => appDispatch({type: "input-text-value-change", value: e.target.value})}
                onSave={() => appDispatch({type: "add-item"})}
                onCancel={() => appDispatch({type: "cancel"})}/>
            <TodoList todoItems={appState.todoItems}
                      onItemClick={(todoItem, index) => appDispatch({
                          type: "item-click",
                          todoItem: todoItem,
                          index: index
                      })}/>
        </div>
    );
}