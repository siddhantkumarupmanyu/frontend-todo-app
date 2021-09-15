export function List({items, ListItem, listItemProp, Divider}) {

    const listItemRendered = []

    items.forEach((item, index) => {
        listItemRendered.push(<ListItem {...listItemProp(item, index)} />)
        if (Divider) {
            listItemRendered.push(<Divider key={`divider-${index}`}/>)
        }
    })

    if (Divider) {
        listItemRendered.pop()
    }

    return (
        <ul>
            {listItemRendered}
        </ul>
    );
}