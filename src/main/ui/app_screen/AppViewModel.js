// noinspection ES6UnusedImports
// eslint-disable-next-line no-unused-vars
import Database from "../../Database";
// for making jsDoc recognize #database

import TodoItem from "../../vo/TodoItem";

export default class AppViewModel {

    /**
     * @type {Database}
     */
    #database

    /**
     * @type {ObservableList}
     */
    #observableItems

    constructor(database) {
        this.#database = database
        this.#observableItems = database.getTodoItems()
    }

    /**
     * @param {string} note
     */
    addNewTodo(note) {
        this.#database.insertTodo(new TodoItem(note, false))
    }

    /**
     * @param {TodoItem} todoItem
     */
    flipStatus(todoItem) {
        this.#database.insertTodo(todoItem.flipStatus())
    }

    /**
     * @return {ObservableList}
     */
    getObservableItems() {
        return this.#observableItems
    }

}