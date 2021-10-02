import TodoItem from "../main/vo/TodoItem";
import {InMemoryDatabase} from "../main/InMemoryDatabase";
import IncorrectIdException from "../main/IncorrectIdException";

/**
 * @type {InMemoryDatabase}
 */
let database = null

beforeEach(() => {
    database = new InMemoryDatabase()
})

test("insertTodo", () => {
    database.insertTodo(new TodoItem("note", false))

    const firstItem = database.getTodoItems().getList()[0]
    expect(firstItem.equals(new TodoItem("note", false, 0))).toBe(true)
})

test("updateItem", () => {
    database.insertTodo(new TodoItem("note", false))

    const updatedItem = new TodoItem("note", true, 0)
    database.updateItem(new TodoItem("note", false, 0), updatedItem)

    expect(database.getTodoItems().getList()[0].equals(updatedItem)).toBe(true)
})

test("deleteTodo", () => {
    database.insertTodo(new TodoItem("note", false))
    database.insertTodo(new TodoItem("note2", false))
    database.insertTodo(new TodoItem("note3", false))

    database.deleteTodo(new TodoItem("note2", false, 1))
    database.deleteTodo(new TodoItem("note3", false, 2))

    expect(database.getTodoItems().getList().length).toBe(1)
    expect((new TodoItem("note", false, 0)).equals(database.getTodoItems().getList()[0])).toBe(true)
    expect((new TodoItem("note3", false, 1)).equals(database.getTodoItems().getList()[1])).toBe(false)
    expect((new TodoItem("note3", false, 2)).equals(database.getTodoItems().getList()[1])).toBe(false)
})

test("updateItemAfterDeletion", () => {
    database.insertTodo(new TodoItem("note", false))
    database.insertTodo(new TodoItem("note2", false))

    database.deleteTodo(new TodoItem("note", false, 0))

    const updatedItem = new TodoItem("note2", true, 1);
    database.updateItem(new TodoItem("note2", false, 1), updatedItem)

    expect(database.getTodoItems().getList()[0].equals(updatedItem)).toBe(true)
})

test("incorrectIdException", () => {
    expect(() => database.insertTodo(new TodoItem("note", true, 0))).toThrow(IncorrectIdException);

    expect(() => database.insertTodo(new TodoItem("note", true, -2))).toThrow(IncorrectIdException);

    expect(() => database.insertTodo(new TodoItem("note", true, 10))).toThrow(IncorrectIdException);
})