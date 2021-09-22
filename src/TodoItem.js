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

}