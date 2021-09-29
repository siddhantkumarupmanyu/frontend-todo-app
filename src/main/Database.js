import {AbstractClassException, AbstractMethodException} from "./AbstractExceptions";

/**
 * Interface Database.
 * @class Database
 */
export default class Database {
    constructor() {
        if (this.constructor === Database) {
            throw new AbstractClassException("Database")
        }
    }

    /**
     * @abstract
     * @param {TodoItem} todoItem
     * @return {void}
     */
    insertTodo(todoItem) {
        throw new AbstractMethodException()
    }

    /**
     * @abstract
     * @return {Array.<TodoItem>}
     */
    getTodoItems() {
        throw new AbstractMethodException()
    }


    // lack of better name
    /**
     * @callback Database~updateListener
     * @return {void}
     */

    /**
     * @abstract
     * @param {Database~updateListener} listener
     * @return {void}
     */
    addListener(listener) {
        throw new AbstractMethodException()
    }

}