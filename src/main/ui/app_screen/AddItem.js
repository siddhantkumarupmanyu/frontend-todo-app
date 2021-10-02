import './AddItem.scss'
import {Button, CancelIconButton, TextInput} from "../base_components/BaseComponents";
import {useState} from "react";

export function AddItem({onSave}) {

    let [inputText, setInputText] = useState("")
    let [errorCssClasses, setErrorCssClasses] = useState("")

    function setFocusToInputAndResetInputText() {
        const input = document.querySelector(".add-item > .text-input")
        input.focus()
        setInputText("")
    }

    function resetInputTextOnSave() {
        if (inputText.trim() === "") {
            setErrorCssClasses("error-border error-shake")
        }
        if (onSave(inputText)) {
            setInputText("")
        }
    }

    const cancelIconVisibility = inputText !== ""

    function onTextChange(e) {
        setErrorCssClasses("")
        setInputText(e.target.value);
    }

    return (
        <div className={`add-item ${errorCssClasses}`} onAnimationEnd={() => setErrorCssClasses("error-border")}>
            <TextInput value={inputText} onChange={onTextChange}/>
            <CancelIconButton isVisible={cancelIconVisibility} onClick={setFocusToInputAndResetInputText}/>
            <Button text="Add" onClick={resetInputTextOnSave}/>
        </div>
    )
}