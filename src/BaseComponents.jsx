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