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
        <ul>
            {renderedList}
        </ul>
    );
}