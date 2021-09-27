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

    const firstItem = database.getTodoItems()[0]
    expect(firstItem.equals(new TodoItem("note", false, 0))).toBe(true)
})

test("updateItem", () => {
    database.insertTodo(new TodoItem("note", false))

    const updatedItem = new TodoItem("note", true, 0)
    database.insertTodo(updatedItem)

    expect(database.getTodoItems()[0].equals(updatedItem)).toBe(true)
})

test("incorrectIdException", () => {
    expect(() => database.insertTodo(new TodoItem("note", true, 0))).toThrow(IncorrectIdException);

    expect(() => database.insertTodo(new TodoItem("note", true, -2))).toThrow(IncorrectIdException);

    expect(() => database.insertTodo(new TodoItem("note", true, 10))).toThrow(IncorrectIdException);
})