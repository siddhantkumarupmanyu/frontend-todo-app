import './BaseComponents.css'

export function Input({value, onChange}) {
    return (
        <input
            className="input"
            type="text"
            onChange={onChange}
            value={value}/>
    )
}

export function Button({text, onClick}) {
    return (
        <button className="button" type="button" onClick={onClick}>{text}</button>
    )
}

// i con refactor it into IconButton
// or MaterialIconButton
// But for now, YAGNI
export function CancelIconButton({isVisible, onClick}) {

    const visibilityValue = isVisible ? "visible" : "hidden"

    return (
        <span tabIndex="0" className="material-icons cancel"
              style={{visibility: visibilityValue}}
              onClick={onClick}>cancel</span>
    )
}