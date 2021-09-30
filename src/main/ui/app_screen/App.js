import {useEffect, useState} from "react";
import './App.scss'
import {AddItem} from "./AddItem";
import {TodoList} from "./TodoList";
// noinspection ES6UnusedImports
// eslint-disable-next-line
import TodoItem from "../../vo/TodoItem";
import * as Utils from "../ui_utils/utils";

// todo: export to github
//  - use github actions for unit and end to end test
//  - use local storage instead of InMemory database

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
        try {
            appViewModel.addNewTodo(text)
            return true
        } catch (e) {
            return false
        }
    }

    function itemClick(item, index) {
        appViewModel.flipStatus(item)
    }

    return (
        <div className="app">
            <AddItem onSave={addItem}/>
            <TodoList todoItems={items}
                      onItemClick={(todoItem, index) => itemClick(todoItem, index)}/>
        </div>
    );
}