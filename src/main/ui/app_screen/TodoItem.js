export default class TodoItem {

    #note
    #isDone

    constructor(note, isDone) {
        this.#note = note
        this.#isDone = isDone
    }

    isDone() {
        return this.#isDone
    }

    getNote() {
        return this.#note
    }

    flipStatus() {
        return new TodoItem(this.#note, !this.#isDone)
    }

}