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

test("flipTodoState", async testController => {
    const textInput = Selector(".text-input")
    const addButton = Selector(".button")
        .withText("ADD")

    await testController
        .typeText(textInput, "newTodoItem1")
        .click(addButton)
    await testController
        .typeText(textInput, "newTodoItem2")
        .click(addButton)

    const item1Selector = Selector(".todo-item").withText("newTodoItem1");
    const item2Selector = Selector(".todo-item").withText("newTodoItem2");

    await testController
        .expect(item1Selector.exists).ok()
        .expect(item2Selector.exists).ok()

    await testController
        .click(item2Selector.child(".checkbox"))

    await testController
        .expect(item2Selector.child("span").getStyleProperty("text-decoration")).contains("line-through")
})

test("removeItem", async (testController) => {
    const textInput = Selector(".text-input")
    const addButton = Selector(".button")
        .withText("ADD")

    await testController
        .typeText(textInput, "newTodoItem1")
        .click(addButton)
    await testController
        .typeText(textInput, "newTodoItem2")
        .click(addButton)

    const item1Selector = Selector(".todo-item").withText("newTodoItem1");
    const item2Selector = Selector(".todo-item").withText("newTodoItem2");

    await testController
        .expect(item1Selector.exists).ok()
        .expect(item2Selector.exists).ok()

    await testController
        .click(item2Selector.child("span").withText("delete"))

    await testController
        .expect(item2Selector.exists).notOk()
})