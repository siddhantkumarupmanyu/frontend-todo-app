import {Transition, TransitionGroup} from "react-transition-group";
import './AnimatedList.scss'

// todo: check if other way is also possible that is,
//  using component={List} in TransitionGroup
/**
 * this list does not support divider yet.
 */
export function AnimatedList({items, timeout, ListItem, listItemKey, listItemProp}) {
    return (
        <ul className="animated-list">
            <TransitionGroup component={null}>{
                items.map((item, index) => (
                    <Transition key={listItemKey(item, index)} timeout={timeout}>{(state) => (
                        <ListItem
                            state={state}
                            {...listItemProp(item, index)}
                        />
                    )}</Transition>
                ))
            }</TransitionGroup>
        </ul>
    )
}