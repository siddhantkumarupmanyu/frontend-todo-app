// i know TodoItem should be immutable, since it should represent value type/object
// but since I am only changing the isDone
// and also the program is not that much complicated

export default class TodoItem {

    #note
    #done

    constructor(note, isDone) {
        this.#note = note
        this.#done = isDone
    }

    isDone() {
        return this.#done
    }

    getNote() {
        return this.#note
    }

    setDone(done) {
        this.#done = done
    }

}