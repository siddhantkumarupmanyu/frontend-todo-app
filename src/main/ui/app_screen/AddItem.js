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
        const errorMsg = onSave(inputText)
        if (errorMsg === "") { // successful save
            setInputText("")
        } else {
            setErrorCssClasses("error-border error-shake")
        }
    }

    const cancelIconVisibility = inputText !== ""

    function onTextChange(e) {
        setErrorCssClasses("")
        setInputText(e.target.value);
    }

    let placeholderText = "Enter New Note"
    if (errorCssClasses) {
        placeholderText = "Empty Note"
    }

    return (
        <div className={`add-item ${errorCssClasses}`} onAnimationEnd={() => setErrorCssClasses("error-border")}>
            <TextInput value={inputText} onChange={onTextChange} placeholder={placeholderText}/>
            <CancelIconButton isVisible={cancelIconVisibility} onClick={setFocusToInputAndResetInputText}/>
            <Button text="Add" onClick={resetInputTextOnSave}/>
        </div>
    )
}