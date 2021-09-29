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

    constructor(database) {
        this.#database = database
    }


    /**
     * @param {string} note
     */
    addNewTodo(note) {
        this.#database.insertTodo(new TodoItem(note, false))
    }
}