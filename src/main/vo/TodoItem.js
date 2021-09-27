import SameIdDifferentValueException from "../SameIdDifferentValueException";

export default class TodoItem {

    static NO_ID = -1

    #id
    #note
    #isDone

    constructor(note, isDone, id = TodoItem.NO_ID) {
        this.#id = id
        this.#note = note
        this.#isDone = isDone
    }

    isDone() {
        return this.#isDone
    }

    getNote() {
        return this.#note
    }

    getId() {
        return this.#id
    }
    
    flipStatus() {
        return new TodoItem(this.#note, !this.#isDone, this.#id)
    }

    equals(other) {
        // https://stackoverflow.com/questions/1249531/how-to-get-a-javascript-objects-class
        if (!(other instanceof TodoItem)) {
            return false
        }

        if (this === other) {
            return true
        }
        if (this.#id === other.#id) {
            if ((this.#note !== other.#note) || this.#isDone !== other.#isDone) {
                throw new SameIdDifferentValueException()
            }
            return true
        }
        return false
    }
}