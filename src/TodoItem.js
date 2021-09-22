// i know TodoItem should be immutable, since it should represent value type/object
// but since I am only changing the isDone
// and also the program is not that much complicated

export default class TodoItem {

    #note
    #isDone

    constructor(note, isDone) {
        this.#note = note
        this.#isDone = isDone
    }

    getIsDone() {
        return this.#isDone
    }

    getNote() {
        return this.#note
    }

    setIsDone(done) {
        this.#isDone = done
    }

}