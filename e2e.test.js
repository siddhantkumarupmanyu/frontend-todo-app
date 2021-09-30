import {Selector} from 'testcafe';

// https://github.com/facebook/create-react-app/issues/6708#issuecomment-488390832

// eslint-disable-next-line no-undef
fixture`EndToEndTest`
    .page`http://localhost:3000`

test("addTodo", async testController => {
    const textInput = Selector(".text-input")
    const addButton = Selector(".button")
        .withText("ADD")

    await testController
        .typeText(textInput, "newTodoItem")
        .click(addButton)

    await testController
        .expect(Selector(".todo-item").withText("newTodoItem").exists).ok()
})