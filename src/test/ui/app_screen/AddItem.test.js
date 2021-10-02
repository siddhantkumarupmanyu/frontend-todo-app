import {render, screen} from "@testing-library/react";
import {AddItem} from "../../../main/ui/app_screen/AddItem";
import userEvent from "@testing-library/user-event";


test("shouldBeAbleToEnterText", () => {
    render(<AddItem/>)

    const textInput = document.querySelector(".text-input")

    userEvent.type(textInput, "someText")

    expect(textInput).toHaveValue("someText")
})

// this can be reworded as shouldResetInputTextOnCancel
// but just to remind me in future that I can also write it as this
test("shouldResetInputText_WhenClickedCancel", () => {
    render(<AddItem/>)

    const textInput = document.querySelector(".text-input")
    userEvent.type(textInput, "someText")

    const cancelButton = screen.getByText("cancel")
    userEvent.click(cancelButton)

    expect(textInput).toHaveValue("")
})

test("shouldResetInputTextOnSuccessfulSave", () => {
    const fn = jest.fn()

    render(<AddItem onSave={fn}/>)

    fn.mockReturnValue("")

    const textInput = document.querySelector(".text-input")
    userEvent.type(textInput, "someText")

    const saveButton = screen.getByText("Add");
    userEvent.click(saveButton)

    expect(fn).toBeCalledTimes(1)
    expect(textInput).toHaveValue("")
})

test("shouldNotResetInputText_WhenSaveIsNotSuccessful", () => {
    const fn = jest.fn()
    render(<AddItem onSave={fn}/>)

    fn.mockReturnValue("Error Msg")

    const textInput = document.querySelector(".text-input")
    userEvent.type(textInput, "someText")

    const saveButton = screen.getByText("Add");
    userEvent.click(saveButton)

    expect(textInput).toHaveValue("someText")
})