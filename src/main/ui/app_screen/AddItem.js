import './AddItem.scss'
import {Button, CancelIconButton, TextInput} from "../base_components/BaseComponents";
import {useState} from "react";

export function AddItem({onSave}) {

    let [inputText, setInputText] = useState("")

    function setFocusToInputAndResetInputText() {
        const input = document.querySelector(".add-item > .text-input")
        input.focus()
        setInputText("")
    }

    function resetInputTextOnSave() {
        if (onSave(inputText)) {
            setInputText("")
        }
    }

    const cancelIconVisibility = inputText !== ""

    return (
        <div className="add-item">
            <TextInput value={inputText} onChange={(e) => setInputText(e.target.value)}/>
            <CancelIconButton isVisible={cancelIconVisibility} onClick={setFocusToInputAndResetInputText}/>
            <Button text="Add" onClick={resetInputTextOnSave}/>
        </div>
    )
}