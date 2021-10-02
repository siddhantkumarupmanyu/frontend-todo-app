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
        if (todoItem.getId() !== TodoItem.NO_ID) {
            throw new IncorrectIdException()
        }
        const todoItemWithId = new TodoItem(todoItem.getNote(), todoItem.isDone(), this._getId())
        this.#items.push(todoItemWithId)
    }

    // todo: rename updateItem to updateTodo
    updateItem(currentItem, updatedItem) {
        this.#items.updateItem(currentItem, (item, listItem) => (item.equals(listItem)), updatedItem)
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
