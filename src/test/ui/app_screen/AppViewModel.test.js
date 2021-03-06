// noinspection JSUnresolvedFunction

import AppViewModel from "../../../main/ui/app_screen/AppViewModel";
import Database from "../../../main/Database";
import TodoItem from "../../../main/vo/TodoItem";

// https://jestjs.io/docs/es6-class-mocks#automatic-mock
jest.mock("../../../main/Database")

beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    Database.mockClear();
})

// TODO: should create test fixtures
//  - to much code is getting duplicated in tests

// I do not know, where should the responsibility of creating of TodoItem go?
//  - in viewModel or in App.js or in AddItem.js
//  - for now I am leaving it in viewModel

test("addNewTodo", () => {
    const database = new Database()
    const appViewModel = new AppViewModel(database)

    appViewModel.addNewTodo("note")

    const insertTodo = getMockedInsertTodo()

    expect(insertTodo).toBeCalledTimes(1)
    expect(insertTodo).toBeCalledWith(expect.todoItem(new TodoItem("note", false, TodoItem.NO_ID)))
})

test("flipTodoStatus", () => {
    const database = new Database()
    const appViewModel = new AppViewModel(database)

    appViewModel.addNewTodo("note0")
    appViewModel.addNewTodo("note1")
    appViewModel.deleteTodo(new TodoItem("note", false, 0))

    appViewModel.addNewTodo("note2")

    appViewModel.flipStatus(new TodoItem("note2", false, 2))

    const updateItem = getMockedUpdateItem()

    expect(updateItem).toBeCalledTimes(1)
    expect(updateItem).lastCalledWith(
        expect.todoItem(new TodoItem("note2", false, 2)),
        expect.todoItem(new TodoItem("note2", true, 2))
    )
})

test("deleteNote", () => {
    const database = new Database()
    const appViewModel = new AppViewModel(database)

    appViewModel.addNewTodo("note")
    appViewModel.deleteTodo(new TodoItem("note", false, 0))

    const deleteTodo = getMockedDeleteTodo()

    expect(deleteTodo).toBeCalledTimes(1)
    expect(deleteTodo).toBeCalledWith(expect.todoItem(new TodoItem("note", false, 0)))
})


test.skip("jestMockSpike", () => {
    // we are using automatic mock for mocking es6 class
    // https://jestjs.io/docs/es6-class-mocks#automatic-mock

    const database = new Database()
    const item = new TodoItem("note", false, 0)
    database.insertTodo(item)

    // checking invoking of constructor
    expect(Database).toBeCalledTimes(1)

    const insertTodo = getMockedInsertTodo()

    // checking invoking of function
    expect(insertTodo).toBeCalledTimes(1)
    expect(insertTodo).toBeCalledWith(item)
})


// https://jestjs.io/docs/expect#expectextendmatchers
// IDK why the failure message is not getting printed
expect.extend({
    todoItem(received, expected) {
        const isEqual = expected.equals(received)
        if (isEqual) {
            return {
                message: () => `expected ${received} to not equal ${expected}`,
                pass: true
            }
        } else {
            return {
                message: () => `expected ${received} to equal ${expected}`,
                pass: false
            }
        }
    }
})

function getMockedInsertTodo() {
    return Database.mock.instances[0].insertTodo;
}

function getMockedDeleteTodo() {
    return Database.mock.instances[0].deleteTodo;
}

function getMockedUpdateItem() {
    return Database.mock.instances[0].updateItem;
}