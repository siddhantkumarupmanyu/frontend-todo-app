import './BaseComponents.scss'

export function TextInput({value, placeholder, onChange}) {
    return (
        <input
            className="text-input"
            type="text"
            onChange={onChange}
            value={value}
            placeholder={placeholder}/>
    )
}

export function Button({text, onClick}) {
    return (
        <button className="button" type="button" onClick={onClick}>{text}</button>
    )
}

export function MaterialIconButton({iconName, onClick, style}) {
    return (
        <span tabIndex="0" className="material-icons material-icon-button"
              style={style}
              onClick={onClick}>{iconName}</span>
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