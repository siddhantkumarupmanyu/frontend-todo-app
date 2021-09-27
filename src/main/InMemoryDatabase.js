import TodoItem from "./vo/TodoItem";
import IncorrectIdException from "./IncorrectIdException";

export class InMemoryDatabase {

    #autoId
    #items
    #listeners

    constructor() {
        this.#autoId = 0
        this.#items = []
        this.#listeners = []
    }

    insertTodo(todoItem) {
        if (todoItem.getId() === TodoItem.NO_ID) {
            this._insertNewItem(todoItem)
        } else {
            this._updateItem(todoItem)
        }
        this._notifyListeners()
    }

    _insertNewItem(todoItem) {
        const todoItemWithId = new TodoItem(todoItem.getNote(), todoItem.isDone(), this._getId())
        this.#items.push(todoItemWithId)
    }

    _updateItem(todoItem) {
        if ((todoItem.getId() >= this.#autoId) || (todoItem.getId() < -1)) {
            throw new IncorrectIdException()
        }
        this.#items[todoItem.getId()] = todoItem
    }

    getTodoItems() {
        return this.#items
    }

    _getId() {
        return this.#autoId++;
    }

    addListener(listener) {
        this.#listeners.push(listener)
    }

    _notifyListeners() {
        for (const listener of this.#listeners) {
            listener()
        }
    }
}