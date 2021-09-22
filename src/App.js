import {useEffect, useReducer, useState} from "react";
import './App.scss'
import {AddItem} from "./AddItem";
import {TodoList} from "./TodoList";

const initialState = {
    items: ["initial"],
    inputText: "",
    editItemIndex: -1
}

function reducer(state, action) {
    switch (action.type) {
        case "value-change":
            return {
                ...state,
                inputText: action.value
            }
        case "edit-item": {
            return {
                ...state,
                editItemIndex: action.editItemIndex,
                inputText: state.items[action.editItemIndex]
            }
        }
        case "save":
            if (state.editItemIndex === -1) {
                return {
                    ...state,
                    items: state.items.concat([state.inputText]),
                    inputText: ""
                }
            }
            state.items[state.editItemIndex] = state.inputText
            return {
                ...state,
                inputText: ""
            }
        case "cancel":
            return {
                ...state,
                editItemIndex: -1,
                inputText: ""
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
                onChange={(e) => appDispatch({type: "value-change", value: e.target.value})}
                onSave={() => appDispatch({type: "save"})}
                onCancel={() => appDispatch({type: "cancel"})}/>
            <TodoList/>
        </div>
    );
}

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