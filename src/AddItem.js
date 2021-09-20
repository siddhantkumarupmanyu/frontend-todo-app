import './AddItem.css'

export function AddItem({value, onChange, onSave, onCancel}) {

    function setFocusToInputAndCallOnCancel() {
        const input = document.querySelector(".add-item > div > input")
        input.focus()
        onCancel()
    }

    const cancelIconVisibility = value === "" ? "hidden" : "visible"

    return (
        <div className="add-item">
            <div>
                <input type="text" onChange={onChange} value={value}/>
                <span tabIndex="0" className="material-icons cancel"
                      style={{visibility: cancelIconVisibility}}
                      onClick={setFocusToInputAndCallOnCancel}>cancel</span>
            </div>
            <button type="button" onClick={onSave}>Add</button>
        </div>
    )
}