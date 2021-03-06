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
        if (this.isEmpty(note)) {
            // i could have used a return false from here;
            // but that also means to change catching exception from ui to viewModel
            // IDK if that's the right thing to do right now

            // could make a Exception; like EmptyStringException
            throw new Error("Empty Note")
        }
        this.#database.insertTodo(new TodoItem(note, false))
    }

    isEmpty(note) {
        return (note.trim().length === 0) || (note.trim() === "");
    }

    /**
     * @param {TodoItem} todoItem
     */
    flipStatus(todoItem) {
        this.#database.updateItem(todoItem, todoItem.flipStatus())
    }

    /**
     * @param {TodoItem} todoItem
     */
    deleteTodo(todoItem) {
        this.#database.deleteTodo(todoItem)
    }

    /**
     * @return {ObservableList}
     */
    getObservableItems() {
        return this.#observableItems
    }

}