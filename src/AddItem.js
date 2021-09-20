import './AddItem.css'
import {Button, Input} from "./BaseComponents";

export function AddItem({value, onChange, onSave, onCancel}) {

    function setFocusToInputAndCallOnCancel() {
        const input = document.querySelector(".add-item > input")
        input.focus()
        onCancel()
    }

    const cancelIconVisibility = value === "" ? "hidden" : "visible"

    return (
        <div className="add-item">
            <Input value={value} onChange={onChange}/>
            <span tabIndex="0" className="material-icons cancel"
                  style={{visibility: cancelIconVisibility}}
                  onClick={setFocusToInputAndCallOnCancel}>cancel</span>
            {/*<button type="button" onClick={onSave}>Add</button>*/}
            <Button text="Add" onClick={onSave}/>
        </div>
    )
}