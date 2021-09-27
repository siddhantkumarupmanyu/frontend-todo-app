import './BaseComponents.scss'

export function TextInput({value, onChange}) {
    return (
        <input
            className="text-input"
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

export function List({items, ListItem, listItemProp, Divider}) {

    const renderedList = []

    items.forEach((item, index) => {
        renderedList.push(<ListItem {...listItemProp(item, index)} />)
        if (Divider) {
            renderedList.push(<Divider key={`divider-${index}`}/>)
        }
    })

    if (Divider) {
        renderedList.pop()
    }

    return (
        <ul className="list">
            {renderedList}
        </ul>
    );
}

export function Checkbox({isChecked, onClick}) {
    return (
        <input className="checkbox" type="checkbox" checked={isChecked} onChange={onClick}/>
    )
}