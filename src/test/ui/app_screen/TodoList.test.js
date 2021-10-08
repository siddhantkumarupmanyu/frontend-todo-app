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

describe("singleItemAtATime", () => {

    test("removeFromLast", () => {
        const {rerender} = render(<TodoList todoItems={Array.from(items)}/>)
        expect(document.querySelector(".remove")).not.toBeInTheDocument()

        items.splice(4, 1)
        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemsRemoved(5, 4);

        items.splice(3, 1)
        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemsRemoved(4, 3);

        items.splice(2, 1)
        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemsRemoved(3, 2);
    })

    test("removeFromFront", () => {
        const {rerender} = render(<TodoList todoItems={Array.from(items)}/>)
        expect(document.querySelector(".remove")).not.toBeInTheDocument()

        items.splice(0, 1)
        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemsRemoved(5, 0);

        items.splice(1, 1)
        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemsRemoved(4, 1);

        items.splice(2, 1)
        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemsRemoved(3, 2);
    })

    test("removeFromBetween", () => {
        const {rerender} = render(<TodoList todoItems={Array.from(items)}/>)
        expect(document.querySelector(".remove")).not.toBeInTheDocument()

        items.splice(3, 1)
        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemsRemoved(5, 3);

        items.splice(2, 1)
        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemsRemoved(4, 2);

        items.splice(1, 1)
        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemsRemoved(3, 1);
    })

    test("addToLast", () => {
        const {rerender} = render(<TodoList todoItems={Array.from(items)}/>)
        expect(document.querySelector(".add")).not.toBeInTheDocument()

        items.push(new TodoItem("note5", false, 5))

        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemsWithClass(6, "add", 5)

        items.push(new TodoItem("note6", false, 6))

        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemsWithClass(7, "add", 6)
    })

    test("addingThenRemoving", () => {
        const {rerender} = render(<TodoList todoItems={Array.from(items)}/>)
        expect(document.querySelector(".add")).not.toBeInTheDocument()
        expect(document.querySelector(".remove")).not.toBeInTheDocument()

        items.push(new TodoItem("note5", false, 5))

        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemsWithClass(6, "add", 5)

        items.splice(2, 1)

        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemsRemoved(6, 2);
    })
})

describe("multipleItemsAtATime", () => {
    test("removeFromLast", () => {
        const {rerender} = render(<TodoList todoItems={Array.from(items)}/>)
        expect(document.querySelector(".remove")).not.toBeInTheDocument()

        items.splice(4, 1)
        items.splice(2, 1)

        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemsRemoved(5, 4, 2);
    })
})


function expectItemsRemoved(childrenCount, ...index) {
    expectItemsWithClass(childrenCount, "remove", ...index);
}

function expectItemsWithClass(childrenCount, className, ...index) {
    const listElement = document.querySelector("ul");
    expect(listElement.childElementCount).toEqual(childrenCount)
    for (let i = 0; i < childrenCount; i++) {
        if ((i === index[0]) || (i === index[1])) { // i will never do more than two item one time so YAGANI
            expect(listElement.children[i]).toHaveClass(className)
        } else {
            expect(listElement.children[i]).not.toHaveClass(className)
        }
    }
}
