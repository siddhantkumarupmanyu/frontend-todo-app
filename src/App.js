import {useEffect, useReducer, useState} from "react";
import './App.scss'
import {AddItem} from "./AddItem";
import {TodoList} from "./TodoList";
import TodoItem from "./TodoItem";

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
                // todo
                todoItems: state.todoItems.concat([state.inputText]),
                inputText: ""
            }
        case "cancel":
            return {
                ...state,
                inputText: ""
            }
        case "item-click":
            const newArray = Array.from(state.todoItems)
            newArray[action.index] = new TodoItem(newArray[action.index].getNote(), !newArray[action.index].isDone())
            // state.todoItems[action.index] = new TodoItem(state.todoItems[action.index].getNote(), !state.todoItems[action.index].isDone())
            // newArray[action.index].setDone(!newArray[action.index].isDone())
            // console.log(newArray)
            return {
                ...state,
                // todoItems: [...state.todoItems]
                todoItems: newArray
            }
        default:
            throw new Error()
    }
}


export default function App() {

    const [appState, appDispatch] = useReducer(reducer, initialState)

    // making sure useEffectDoes does not run every time component is updated/rendered
    const [rgbVars, setRgbVarsState] = useState(false)
    useEffect(() => {
        setRGBVars()
        setRgbVarsState(true)
        // todo: this is getting called two times on initial load; fix this
        // console.log("one time ")
    }, [rgbVars])

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


// util
function setRGBVars() {
    const colorVars = getAllCssVars().filter((value) => (value.startsWith("--color")))

    const rootStyle = document.documentElement.style
    const computedRootStyle = getComputedStyle(document.documentElement)
    for (const colorVar of colorVars) {
        const colorHex = computedRootStyle.getPropertyValue(colorVar)
        const [r, g, b] = getRGBFromHex(colorHex)
        rootStyle.setProperty(`--rgb-${(colorVar.substr(8))}`, `${r},${g},${b}`)
    }
}

function getAllCssVars() {
    const cssVars = []
    const rootStyleProperties = getComputedStyle(document.documentElement)
    for (const property in rootStyleProperties) {
        if (String(rootStyleProperties[property]).startsWith("--")) {
            cssVars.push(rootStyleProperties[property])
        }
    }
    return cssVars
}

function getRGBFromHex(hex) {
    let r = ""
    let g = ""
    let b = ""

    if (hex.length < 7) {
        throw new Error("unsupported hex length")
    }

    r = parseInt(hex[1] + hex[2], 16).toString()
    g = parseInt(hex[3] + hex[4], 16).toString()
    b = parseInt(hex[5] + hex[6], 16).toString()
    return [r, g, b]
}