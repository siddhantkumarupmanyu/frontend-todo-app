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