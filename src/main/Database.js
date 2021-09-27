import {AbstractClassException, AbstractMethodException} from "./AbstractExceptions";


// In my opinion i am unnecessary creating this
// interface right now. I do not know what abstraction I gonna need
// therefore pausing right here for this file.
// first I am going to implement the InMemoryDatabase, and then
// I will extract/abstract the methods.

/**
 * Interface Database.
 *
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
     */
    saveTodo() {
        throw new AbstractMethodException()
    }

    /**
     * @param id {number}
     */
    getTodo(id) {
        throw new AbstractMethodException()
    }

    /**
     * @return {Array.<TodoItem>}
     */
    getTodoList() {
        throw new AbstractMethodException()
    }

}