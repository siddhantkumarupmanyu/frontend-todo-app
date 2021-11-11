import React from "react";
import {render, screen} from "@testing-library/react";
import {config} from "react-transition-group";
import {AnimatedList} from "../../../main/ui/base_components/AnimatedList";

beforeAll(() => {
    // https://reactcommunity.org/react-transition-group/testing
    config.disabled = true
})

test("shouldBeAbleToAddAndRemoveItems", () => {
    const items = ["1", "2", "3", "4", "5"]

    const {rerender} = render(
        <AnimatedList
            timeout={{
                enter: 0,
                exit: 1000,
            }}
            items={items}
            ListItem={TestListItem}
            listItemKey={(item, index) => `${item}-${index}`}
            listItemProp={(item, index) => ({
                item: item,
                index: index
            })}
        />
    )

    expect(screen.getByText("2 at 1")).toBeInTheDocument()

    items.splice(1, 1)
    items.push("5")

    rerender(<AnimatedList
        timeout={{
            enter: 0,
            exit: 1000,
        }}
        items={items}
        ListItem={TestListItem}
        listItemKey={(item, index) => `${item}-${index}`}
        listItemProp={(item, index) => ({
            item: item,
            index: index
        })}
    />)

    expect(screen.queryByText("2 at 1")).not.toBeInTheDocument()
    expect(screen.getByText("5 at 4")).toBeInTheDocument()
})

const TestListItem = React.forwardRef((props, ref) => {
    const {item, index} = props

    return (
        <span ref={ref}>{item} at {index}</span>
    )
})