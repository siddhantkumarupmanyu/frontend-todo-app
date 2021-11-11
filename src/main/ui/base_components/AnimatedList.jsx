import {Transition, TransitionGroup} from "react-transition-group";
import './AnimatedList.scss'
import {useEffect, useRef} from "react";

// todo: check if other way is also possible that is,
//  using component={List} in TransitionGroup
/**
 * this list does not support divider yet.
 * one more thing, the ListItem should be forwardRef-ed
 */
// "findDOMNode is deprecated in StrictMode", so have to use forwardRef
export function AnimatedList({items, timeout, ListItem, listItemKey, listItemProp}) {

    // https://stackoverflow.com/a/56063129
    const itemRefs = useRef([])

    useEffect(() => {
        itemRefs.current = itemRefs.current.slice(0, items.length)
    }, [items])

    return (
        <ul className="animated-list">
            <TransitionGroup component={null}>{
                items.map((item, index) => (
                    <Transition key={listItemKey(item, index)} timeout={timeout}>{(state) => (
                        <ListItem
                            ref={el => itemRefs.current[index] = el}
                            state={state}
                            {...listItemProp(item, index)}
                        />
                    )}</Transition>
                ))
            }</TransitionGroup>
        </ul>
    )
}