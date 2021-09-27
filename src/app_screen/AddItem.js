import './AddItem.scss'
import {Button, CancelIconButton, TextInput} from "../base_components/BaseComponents";

export function AddItem({value, onChange, onSave, onCancel}) {

    function setFocusToInputAndCallOnCancel() {
        const input = document.querySelector(".add-item > .text-input")
        input.focus()
        onCancel()
    }

    const cancelIconVisibility = value !== ""

    return (
        <div className="add-item">
            <TextInput value={value} onChange={onChange}/>
            <CancelIconButton isVisible={cancelIconVisibility} onClick={setFocusToInputAndCallOnCancel}/>
            <Button text="Add" onClick={onSave}/>
        </div>
    )
}