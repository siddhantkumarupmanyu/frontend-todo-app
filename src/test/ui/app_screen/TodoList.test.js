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
        expectItemRemoved(4, 4);
    })

    test("removedFromFront", () => {
        const {rerender} = render(<TodoList todoItems={Array.from(items)}/>)
        expect(document.querySelector(".remove")).not.toBeInTheDocument()

        items.splice(0, 1)

        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemRemoved(0, 4);
    })

    test("removedFromBetween", () => {
        const {rerender} = render(<TodoList todoItems={Array.from(items)}/>)
        expect(document.querySelector(".remove")).not.toBeInTheDocument()

        items.splice(2, 1)

        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemRemoved(2, 4);
    })

    test("addedToLast", () => {
        const {rerender} = render(<TodoList todoItems={Array.from(items)}/>)
        expect(document.querySelector(".add")).not.toBeInTheDocument()

        items.push(new TodoItem("note5", false, 5))

        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectOnlyItemWithClass(5, 5, "add")
    })

})

describe.skip("multipleTimes", () => {

    test("removeFromLast", () => {
        const {rerender} = render(<TodoList todoItems={Array.from(items)}/>)
        expect(document.querySelector(".remove")).not.toBeInTheDocument()

        items.splice(4, 1)
        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemRemoved(4);

        items.splice(3, 1)
        rerender(<TodoList todoItems={Array.from(items)}/>)
        expectItemRemoved(3, 4);
    })
})

describe.skip("multipleItems", () => {

})


function expectItemRemoved(index, maxIndex) {
    expectOnlyItemWithClass(index, maxIndex, "remove");
}

function expectOnlyItemWithClass(index, maxIndex, className) {
    for (let i = 0; i <= maxIndex; i++) {
        if (i === index) {
            expect(document.querySelector("ul").children[i]).toHaveClass(className)
        } else {
            expect(document.querySelector("ul").children[i]).not.toHaveClass(className)
        }
    }
}
