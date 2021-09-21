import './AddItem.scss'
import {Button, CancelIconButton, Input} from "./BaseComponents";

export function AddItem({value, onChange, onSave, onCancel}) {

    function setFocusToInputAndCallOnCancel() {
        const input = document.querySelector(".add-item > .input")
        input.focus()
        onCancel()
    }

    const cancelIconVisibility = value !== ""

    return (
        <div className="add-item">
            <Input value={value} onChange={onChange}/>
            <CancelIconButton isVisible={cancelIconVisibility} onClick={setFocusToInputAndCallOnCancel}/>
            <Button text="Add" onClick={onSave}/>
        </div>
    )
}