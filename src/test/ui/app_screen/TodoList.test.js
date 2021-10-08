import {render, screen} from "@testing-library/react";
import {TodoList} from "../../../main/ui/app_screen/TodoList";
import TodoItem from "../../../main/vo/TodoItem";


let items = [];

beforeEach(() => {
    items = [
        new TodoItem("note0", false, 0),
        new TodoItem("note1", false, 1),
        new TodoItem("note2", false, 2),
        new TodoItem("note3", false, 3),
        new TodoItem("note4", false, 4),
    ]
})

describe("singleItem", () => {

    test("removedFromLast", () => {
        const {rerender} = render(<TodoList todoItems={Array.from(items)}/>)
        expect(document.querySelector(".remove")).not.toBeInTheDocument()

        items.splice(4, 1)

        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemRemoved(4, 5);
    })

    test("removedFromFront", () => {
        const {rerender} = render(<TodoList todoItems={Array.from(items)}/>)
        expect(document.querySelector(".remove")).not.toBeInTheDocument()

        items.splice(0, 1)

        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemRemoved(0, 5);
    })

    test("removedFromBetween", () => {
        const {rerender} = render(<TodoList todoItems={Array.from(items)}/>)
        expect(document.querySelector(".remove")).not.toBeInTheDocument()

        items.splice(2, 1)

        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemRemoved(2, 5);
    })

    test("addedToLast", () => {
        const {rerender} = render(<TodoList todoItems={Array.from(items)}/>)
        expect(document.querySelector(".add")).not.toBeInTheDocument()

        items.push(new TodoItem("note5", false, 5))

        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectOnlyItemWithClass(5, 6, "add")
    })

})

describe("multipleTimes", () => {

    test("removeFromLast", () => {
        const {rerender} = render(<TodoList todoItems={Array.from(items)}/>)
        expect(document.querySelector(".remove")).not.toBeInTheDocument()

        items.splice(4, 1)
        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemRemoved(4, 5);

        items.splice(3, 1)
        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemRemoved(3, 4);

        items.splice(2, 1)
        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemRemoved(2, 3);
    })

    test("removeFromFront", () => {
        const {rerender} = render(<TodoList todoItems={Array.from(items)}/>)
        expect(document.querySelector(".remove")).not.toBeInTheDocument()

        items.splice(0, 1)
        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemRemoved(0, 5);

        items.splice(1, 1)
        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemRemoved(1, 4);

        items.splice(2, 1)
        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemRemoved(2, 3);
    })

    test("removeFromBetween", () => {
        const {rerender} = render(<TodoList todoItems={Array.from(items)}/>)
        expect(document.querySelector(".remove")).not.toBeInTheDocument()

        items.splice(3, 1)
        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemRemoved(3, 5);

        items.splice(2, 1)
        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemRemoved(2, 4);

        items.splice(1, 1)
        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemRemoved(1, 3);
    })

    test("addToLast", () => {
        const {rerender} = render(<TodoList todoItems={Array.from(items)}/>)
        expect(document.querySelector(".add")).not.toBeInTheDocument()

        items.push(new TodoItem("note5", false, 5))

        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectOnlyItemWithClass(5, 6, "add")

        items.push(new TodoItem("note6", false, 6))

        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectOnlyItemWithClass(6, 7, "add")
    })
})

describe.skip("multipleItems", () => {

})


function expectItemRemoved(index, childrenCount) {
    expectOnlyItemWithClass(index, childrenCount, "remove");
}

function expectOnlyItemWithClass(index, childrenCount, className) {
    const listElement = document.querySelector("ul");
    expect(listElement.childElementCount).toEqual(childrenCount)
    for (let i = 0; i < childrenCount; i++) {
        if (i === index) {
            expect(listElement.children[i]).toHaveClass(className)
        } else {
            expect(listElement.children[i]).not.toHaveClass(className)
        }
    }
}
