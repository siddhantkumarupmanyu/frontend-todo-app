import {useEffect, useReducer, useState} from "react";
import './App.scss'
import {AddItem} from "./AddItem";
import {TodoList} from "./TodoList";
import TodoItem from "../../vo/TodoItem";
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
            newArray[action.index] = new TodoItem(newArray[action.index].getNote(), !newArray[action.index].isDone())
            return {
                ...state,
                todoItems: newArray
            }
        default:
            throw new Error()
    }
}


export default function App({appViewModel}) {

    let [items, setItems] = useState(appViewModel.getObservableItems().getList())

    useEffect(() => {
        Utils.setRGBVars()
    }, [])

    useEffect(() => {

        appViewModel.getObservableItems().addListener((newList) => {
            // because react needs f*cking Immutability
            setItems(Array.from(newList))
        })
    }, [appViewModel])

    function addItem(text) {
        // return true if save is successful
        // return true
        try {
            appViewModel.addNewTodo(text)
            return true
        } catch (e) {
            return false
        }
    }

    function clickItem(item, index) {
        appViewModel.flipStatus(item)
    }

    return (
        <div className="app">
            <AddItem onSave={addItem}/>
            <TodoList todoItems={items}
                      onItemClick={(todoItem, index) => clickItem(todoItem, index)}/>
        </div>
    );
}