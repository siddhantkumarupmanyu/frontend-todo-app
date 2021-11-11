import {render, screen} from "@testing-library/react";
import {TodoList} from "../../../main/ui/app_screen/TodoList";
import TodoItem from "../../../main/vo/TodoItem";
import {useRef} from "react";

import {config} from 'react-transition-group';

let items = [];

beforeAll(() => {
    // https://reactcommunity.org/react-transition-group/testing
    config.disabled = true
})

beforeEach(() => {
    items = [
        new TodoItem("note0", false, 0),
        new TodoItem("note1", false, 1),
        new TodoItem("note2", false, 2),
        new TodoItem("note3", false, 3),
        new TodoItem("note4", false, 4),
    ]
})

test("itemsAreRendered", () => {
    const {rerender} = render(<TodoList todoItems={Array.from(items)}/>)

    expect(screen.getByText("note2")).toBeInTheDocument()
    expect(screen.getByText("note4")).toBeInTheDocument()

    items.splice(2, 1)
    items.push(new TodoItem("note5", false, 5))

    rerender(<TodoList todoItems={Array.from(items)}/>)

    expect(screen.queryByText("note2")).not.toBeInTheDocument()
    expect(screen.getByText("note5")).toBeInTheDocument()
})

test.skip("onItemClick", () => {

})

test.skip("onItemDelete", () => {

})

// this is a learning test
function RefSpikeComponent({i}) {

    const iRef = useRef(i)
    const oldVal = iRef.current
    iRef.current = i

    return (
        <span>{oldVal}</span>
    )
}

test.skip("refHookSpike", () => {
    const {rerender} = render(<RefSpikeComponent i={1}/>)

    expect(screen.getByText(1)).toBeInTheDocument()

    rerender(<RefSpikeComponent i={2}/>)

    expect(screen.getByText(1)).toBeInTheDocument()

    rerender(<RefSpikeComponent i={3}/>)

    expect(screen.getByText(2)).toBeInTheDocument()
})