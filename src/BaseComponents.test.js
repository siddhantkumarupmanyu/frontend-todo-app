import {render, screen} from "@testing-library/react";
import {Button, CancelIconButton, Checkbox, List, TextInput} from "./BaseComponents";
import userEvent from "@testing-library/user-event";


test("button", () => {

    let fn = jest.fn()

    render(<Button text="buttonText" onClick={fn}/>)

    // should be rendered with buttonText
    expect(screen.getByText("buttonText")).toBeInTheDocument()

    // should call given function when clicked
    userEvent.click(screen.getByText("buttonText"))
    expect(fn).toHaveBeenCalledTimes(1)
})

test("textInput", () => {
    let value = "initial"
    let onChange = jest.fn((e) => {
        value = e.target.value
    })

    const {rerender} = render(<TextInput value={value} onChange={onChange}/>)

    const inputText = screen.getByDisplayValue(value);

    expect(inputText).toBeInTheDocument()

    userEvent.type(inputText, "+")
    rerender(<TextInput value={value} onChange={onChange}/>)

    userEvent.type(inputText, "1")
    rerender(<TextInput value={value} onChange={onChange}/>)

    expect(inputText).toHaveDisplayValue("initial+1")
})

test("cancelIconButton", () => {

    const {rerender} = render(<CancelIconButton isVisible={false}/>)

    const cancelButton = document.querySelector(".cancel");

    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton).not.toBeVisible()

    rerender(<CancelIconButton isVisible={true}/>)
    expect(cancelButton).toBeVisible()

    const fn = jest.fn()

    rerender(<CancelIconButton isVisible={true} onClick={fn}/>)
    userEvent.click(cancelButton)
    expect(fn).toHaveBeenCalledTimes(1)
})

test("checkbox", () => {

    const {rerender} = render(<Checkbox isChecked={false} onClick={() => {
    }}/>)

    const checkbox = document.querySelector(".checkbox")
    expect(checkbox).not.toBeChecked()

    rerender(<Checkbox isChecked={true} onClick={() => {
    }}/>)
    expect(checkbox).toBeChecked()

    const fn = jest.fn()

    rerender(<Checkbox isChecked={true} onClick={fn}/>)
    userEvent.click(checkbox)
    expect(fn).toHaveBeenCalledTimes(1)
})


test("list", () => {

    function TestItem({text}) {
        return (<li>{text}</li>)
    }

    function TestDivider(){
        return (<li>----</li>)
    }

    const items = ["item1", "item2"]

    render(<List items={items} ListItem={TestItem} listItemProp={(item, index) => ({
        key: index,
        text: item
    })}
    Divider={TestDivider}/>)

    expect(screen.getByText("item1")).toBeInTheDocument()

    // divider should be rendered
    expect(screen.getByText("----")).toBeInTheDocument()
})

