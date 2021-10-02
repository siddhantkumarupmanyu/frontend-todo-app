import TodoItem from "./vo/TodoItem";
import IncorrectIdException from "./IncorrectIdException";
import Database from "./Database";
import ObservableList from "./ObservableList";

export class InMemoryDatabase extends Database {

    #autoId

    /**
     * @type {ObservableList}
     */
    #items

    constructor() {
        super();
        this.#autoId = 0
        this.#items = new ObservableList()
    }

    insertTodo(todoItem) {
        if (todoItem.getId() === TodoItem.NO_ID) {
            this._insertNewItem(todoItem)
        } else {
            this._updateItem(todoItem)
        }
    }

    _insertNewItem(todoItem) {
        const todoItemWithId = new TodoItem(todoItem.getNote(), todoItem.isDone(), this._getId())
        this.#items.push(todoItemWithId)
    }

    _updateItem(todoItem) {
        if ((todoItem.getId() >= this.#autoId) || (todoItem.getId() < -1)) {
            throw new IncorrectIdException()
        }
        this.#items.insert(todoItem, todoItem.getId())
    }

    deleteTodo(todoItem) {
        this.#items.removeItem(todoItem, (item, listItem) => (item.equals(listItem)))
    }

    /**
     * @return {ObservableList}
     */
    getTodoItems() {
        return this.#items
    }

    _getId() {
        return this.#autoId++;
    }
}
