import {useEffect, useState} from "react";
import './App.scss'
import {AddItem} from "./AddItem";
import {TodoList} from "./TodoList";
// noinspection ES6UnusedImports
// eslint-disable-next-line
import TodoItem from "../../vo/TodoItem";
import * as Utils from "../ui_utils/utils";

export default function App({appViewModel}) {

    let [items, setItems] = useState(appViewModel.getObservableItems().getList())

    useEffect(() => {
        Utils.setRGBVars()
    }, [])

    useEffect(() => {

        appViewModel.getObservableItems().addListener((newList) => {
            setItems(Array.from(newList).reverse())
        })
    }, [appViewModel])

    function addItem(text) {
        // return true if save is successful
        // should move this catching logic in appViewModel?
        try {
            appViewModel.addNewTodo(text)
            return ""
        } catch (e) {
            return e.message
        }
    }

    function itemClick(item, index) {
        appViewModel.flipStatus(item)
    }

    function itemDelete(item, index) {
        appViewModel.deleteTodo(item)
    }

    return (
        <div className="app">
            <AddItem onSave={addItem}/>
            <TodoList todoItems={items}
                      onItemClick={itemClick}
                      onItemDelete={itemDelete}/>
        </div>
    );
}